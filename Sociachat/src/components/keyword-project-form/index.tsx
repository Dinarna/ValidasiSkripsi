import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormContext } from "@/hooks/createProject/projectContext";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const formSchema = z.object({
  keywordCrawling: z.string().min(1, {
    message: "Keyword is required.",
  }),
  // tweetToken: z.string().min(1, {
  //   message: "Tweet Token is required.",
  // }),
  country: z.string().min(1, {
    message: "Language is required.",
  }),
  rangeTweet: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .required(),
});

type FormSchema = z.infer<typeof formSchema>;

const KeywordTopicForm: React.FC = () => {
  const { formState, updateFormState } = useFormContext();

  const countries = [
    { value: "en", label: "English" },
    { value: "id", label: "Indonesia" },
  ];

  const navigate = useNavigate();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keywordCrawling: formState.keywordCrawling,
      // tweetToken: formState.tweetToken,
      country: formState.country,
      rangeTweet: formState.rangeTweet,
    },
  });

  const onSubmit: SubmitHandler<FormSchema> = (values) => {
    updateFormState("keywordCrawling", values.keywordCrawling);
    updateFormState("country", values.country);
    // updateFormState("tweetToken", values.tweetToken);
    updateFormState("rangeTweet", values.rangeTweet);
    navigate("/dashboard/create-project/detail-of-topic");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 p-4 bg-white rounded-lg shadow-md w-full"
      >
        <FormField
          control={form.control}
          name="keywordCrawling"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-3 items-center gap-5">
                <div className="min-w-screen">
                  <FormLabel className="col-span-1 pr-12">Keyword</FormLabel>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="bg-secondary text-white w-6 h-6  rounded-full">
                        ?
                      </TooltipTrigger>
                      <TooltipContent>
                        <a href="https://x.com/search-advanced" target="_blank">
                          click here to see advanced keyword search
                        </a>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <FormControl className="col-span-2">
                  <Input placeholder="Example: Anies" {...field} />
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
                <div className="min-w-screen">
                  <FormLabel className="col-span-1 pr-5">Tweet Token</FormLabel>
                  <Dialog>
                    <DialogTrigger className="bg-secondary text-white w-6 h-6  rounded-full">
                      ?
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>How to see twitter auth token </DialogTitle>
                        <DialogDescription>
                          <img src="/auth-token-tutorial.png" alt="twitter auth token" />
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
                <FormControl className="col-span-2">
                  <Input placeholder="Your tweet auth token" {...field} />
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
                      <SelectTrigger>
                        <SelectValue placeholder="Select Language" />
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
            console.log(field.value),
            (
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
            )
          )}
        />

        <div className="w-full  py-4 bg-white border-t border-gray-200 justify-between items-center flex">
          <div className="justify-start items-center gap-2.5 flex">
            <Link to="/dashboard/create-project">
              <Button type="button" variant={"outline"}>
                Cancel
              </Button>
            </Link>
          </div>
          <div className="justify-start items-center gap-3 flex">
            <Button type="submit">Save & Next</Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default KeywordTopicForm;
