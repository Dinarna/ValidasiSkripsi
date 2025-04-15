import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormContext } from "@/hooks/createProject/projectContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  projectTitle: z.string().min(1, { message: "Title is required." }),
  projectDescription: z
    .string()
    .min(1, { message: "Description is required." }),
  projectCategory: z.string().min(1, { message: "Category is required." }),
});

type FormSchema = z.infer<typeof formSchema>;

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

const CreateProjectForm: React.FC = () => {
  const { formState, updateFormState } = useFormContext();
  const navigate = useNavigate();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectTitle: formState.projectTitle,
      projectDescription: formState.projectDescription,
      projectCategory: formState.projectCategory,
    },
  });

  const onSubmit: SubmitHandler<FormSchema> = (values) => {
    updateFormState("projectTitle", values.projectTitle);
    updateFormState("projectDescription", values.projectDescription);
    updateFormState("projectCategory", values.projectCategory);
    navigate("/dashboard/create-project/keyword-crawling");
  };

  const handleSaveAsDraft = () => {
    const values = form.getValues();
    updateFormState("projectTitle", values.projectTitle);
    updateFormState("projectDescription", values.projectDescription);
    updateFormState("projectCategory", values.projectCategory);
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
                <FormLabel className="col-span-1">Project Title</FormLabel>
                <FormControl className="col-span-2">
                  <Input
                    placeholder="Example: Political of Indonesia"
                    {...field}
                  />
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
                <FormLabel className="col-span-1">
                  Project Description
                </FormLabel>
                <FormControl className="col-span-2">
                  <Textarea
                    placeholder="Detail of your topic"
                    className="resize-none"
                    {...field}
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
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

        <div className="w-full py-4 bg-white border-t border-gray-200 justify-between items-center flex">
          <div className="justify-start items-center gap-2.5 flex">
            <Link to="/dashboard">
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

export default CreateProjectForm;
