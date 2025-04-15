import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Textarea } from "../ui/textarea";
import { format } from "date-fns";

import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "@/hooks/createProject/projectContext";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useToast } from "../ui/use-toast";
import Spinner from "../spinner";

const formSchema = z.object({
  projectTitle: z.string().min(1, { message: "Title is required." }),
  projectDescription: z.string().min(1, { message: "Description is required." }),
  projectCategory: z.string().min(1, { message: "Description is required." }),
  keywordCrawling: z.string().min(1, {
    message: "Keyword is required.",
  }),
  // tweetToken: z.string().optional(),
  country: z.string().min(1, { message: "Language is required." }),
  rangeTweet: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .optional(),
});

type FormSchema = z.infer<typeof formSchema>;

const DetailOfTopicForm: React.FC = () => {
  const { formState, createProject, resetForm, getProjectById } = useFormContext();
  const navigate = useNavigate();
  const [buttonText, setButtonText] = useState("Submit");
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: formState,
  });

  const countries = [
    { value: "id", label: "Indonesia" },
    { value: "en", label: "English" },
  ];

  const categories = [
    { value: "politics", label: "Politics" },
    { value: "economic", label: "Economic" },
    { value: "social", label: "Social" },
    { value: "technology", label: "Technology" },
    { value: "entertainment", label: "Entertainment" },
    { value: "sport", label: "Sport" },
    { value: "health", label: "Health" },
    { value: "education", label: "Education" },
    { value: "environment", label: "Environment" },
    { value: "others", label: "Others" },
  ];

  const onSubmit: SubmitHandler<FormSchema> = async () => {
    setLoading(true);

    let readiness = 0;
    try {
      const response = await createProject();
      if (response.status === 201) {
        toast({
          title: response.data.message,
          description:
            "You have successfully created a project. Please wait for the analysis.",
        });
        const projectId = response.data.data._id;

        // Polling to check project status
        while (true) {
          const projectResponse = await getProjectById(projectId);

          // Check if the project status is ready, skip the 'emotion' status
          const projectData = projectResponse.data.data;
          const { topic_modelling, sentiment, emotion, sna } = projectData.project_status;

          // Calculate readiness percentage
          let totalStatus = 4; // Total status checks (excluding emotion)
          let completedStatus = 0;

          if (topic_modelling) completedStatus++;
          if (sentiment) completedStatus++;
          if (sna) completedStatus++;
          if (emotion) completedStatus++; // Include emotion if it's explicitly checked

          readiness = Math.round((completedStatus / totalStatus) * 100);

          // Update button with the readiness percentage
          setButtonText(`Creating Project (${readiness}%)`);

          if (topic_modelling && sentiment && sna && emotion) {
            // Move to the analysis if all required statuses are true
            navigate(`/analysis?id=${projectId}`);
            resetForm();
            break;
          }

          // Optionally add a delay to avoid excessive polling
          await new Promise((resolve) => setTimeout(resolve, 10000)); // 10 seconds delay
        }
      } else {
        toast({
          title: response.data.message,
          description: "Please check your form.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Create Project failed",
        description: "Please check your form.",
        variant: "destructive",
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 p-4 bg-white rounded-lg shadow-md w-full"
      >
        <FormField
          control={form.control}
          name="projectTitle"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-3 items-center gap-5">
                <FormLabel className="col-span-1 text-base">Project Title</FormLabel>
                <FormControl className="col-span-2">
                  <Input placeholder="Example: Anies" {...field} disabled />
                </FormControl>
                <FormMessage className="col-span-2 col-start-2" />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="projectDescription"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-3 items-center gap-5">
                <FormLabel className="col-span-1">Project Description</FormLabel>
                <FormControl className="col-span-2">
                  <Textarea
                    placeholder="Detail of your topic"
                    className="resize-none"
                    {...field}
                    disabled
                  />
                </FormControl>
                <FormMessage className="col-span-2 col-start-2" />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="projectCategory"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-3 items-center gap-5">
                <FormLabel className="col-span-1">Project Category</FormLabel>
                <FormControl className="col-span-2">
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger disabled>
                        <SelectValue placeholder="Select Project Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="col-span-2 col-start-2" />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="keywordCrawling"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-3 items-center gap-5">
                <FormLabel className="col-span-1">Keyword</FormLabel>
                <FormControl className="col-span-2">
                  <Input placeholder="Example: Anies" {...field} disabled />
                </FormControl>
                <FormMessage className="col-span-2 col-start-2" />
              </div>
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="tweetToken"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-3 items-center gap-5">
                <FormLabel className="col-span-1">Tweet Token</FormLabel>
                <FormControl className="col-span-2">
                  <Input placeholder="Your tweet auth token" {...field} disabled />
                </FormControl>
                <FormMessage className="col-span-2 col-start-2" />
              </div>
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-3 items-center gap-5">
                <FormLabel className="col-span-1">Language</FormLabel>
                <FormControl className="col-span-2">
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger disabled>
                        <SelectValue placeholder="Select Project Language" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.value} value={country.value}>
                          {country.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="col-span-2 col-start-2" />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rangeTweet"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-3 items-center gap-5">
                <FormLabel className="col-span-1">Range of Tweet</FormLabel>
                <FormControl className="col-span-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"ghost"}
                        className={cn(
                          "w-[300px] justify-start text-left font-normal",
                          !field.value?.from && "text-muted-foreground"
                        )}
                        disabled
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value?.from ? (
                          field.value.to ? (
                            <>
                              {format(field.value.from, "LLL dd, y")} -{" "}
                              {format(field.value.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(field.value.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={field.value?.from}
                        selected={{
                          from: field.value?.from,
                          to: field.value?.to,
                        }}
                        onSelect={field.onChange}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage className="col-span-2 col-start-2" />
              </div>
            </FormItem>
          )}
        />
        <div className="w-full  py-4 bg-white border-t border-gray-200 justify-between items-center flex">
          <div className="justify-start items-center gap-2.5 flex">
            <Link to="/dashboard/create-project/keyword-crawling">
              <Button type="button" variant={"outline"}>
                Cancel
              </Button>
            </Link>
          </div>
          <div className="justify-start items-center gap-3 flex">
            <Button type="submit" disabled={loading}>
              {buttonText}
              <span>{buttonText !== "Submit" && <Spinner color="white" />}</span>
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default DetailOfTopicForm;
