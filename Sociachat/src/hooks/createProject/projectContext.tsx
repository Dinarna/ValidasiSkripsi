import { axiosPrivate } from "@/axiosConfig";
import { createContext, useContext, useState, ReactNode } from "react";
import { format } from "date-fns";
import { API } from "@/lib/urls";

type FormProviderProps = {
  children: ReactNode;
};

type DateRange = {
  from: Date | undefined;
  to: Date | undefined;
};

type FormState = {
  projectTitle: string;
  projectDescription: string;
  keywordCrawling: string;
  // tweetToken?: string;
  country: string;
  rangeTweet: DateRange;
  projectCategory: string;
};

const FormContext = createContext<
  | {
      formState: FormState;
      updateFormState: (name: string, value: any) => void;
      createProject: () => Promise<any>;
      getProjectById: (id: string) => Promise<any>;
      resetForm: () => void;
    }
  | undefined
>(undefined);

export const FormProvider = ({ children }: FormProviderProps) => {
  const port = import.meta.env.VITE_API_PROJECT_PORT;
  const [formState, setFormState] = useState<FormState>({
    projectTitle: "",
    projectDescription: "",
    keywordCrawling: "",
    // tweetToken: "",
    country: "",
    rangeTweet: {
      from: undefined,
      to: undefined,
    },
    projectCategory: "",
  });

  const updateFormState = (name: string, value: any) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const createProject = async () => {
    try {
      const response = await axiosPrivate.post(`${API}/project`, {
        title: formState.projectTitle,
        description: formState.projectDescription,
        category: formState.projectCategory,
        keyword: formState.keywordCrawling,
        // tweetToken: formState.tweetToken,
        language: formState.country,
        start_date_crawl: formState.rangeTweet.from
          ? format(formState.rangeTweet.from, "yyyy-MM-dd")
          : undefined,
        end_date_crawl: formState.rangeTweet.to
          ? format(formState.rangeTweet.to, "yyyy-MM-dd")
          : undefined,
      });
      return response;
    } catch (error) {
      console.error("Create project failed", error);
    }
  };

  const getProjectById = async (id: string) => {
    try {
      const response = await axiosPrivate.get(`${API}/project/${id}`);
      console.log(response);
      return response;
    } catch (error) {
      console.error("Get project by id failed", error);
    }
  };

  const resetForm = () => {
    setFormState({
      projectTitle: "",
      projectDescription: "",
      keywordCrawling: "",
      // tweetToken: "",
      country: "",
      rangeTweet: {
        from: undefined,
        to: undefined,
      },
      projectCategory: "",
    });
  };

  return (
    <FormContext.Provider
      value={{
        formState,
        updateFormState,
        createProject,
        resetForm,
        getProjectById,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
