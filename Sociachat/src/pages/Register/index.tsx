import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AccentSVG from "@/assets/accent.svg";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import PageWrapper from "@/layouts/PageWrapper";
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
import { useAuth } from "@/hooks/AuthContext";
import { useState } from "react";

const Register = () => {
  interface formRegister {
    email: string;
    password: string;
    name: string;
    confirmPassword: string;
  }

  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const formSchema = z
    .object({
      name: z.string().min(3, "Name must be at least 3 characters long."),
      email: z.string().email("Please enter a valid email address."),
      password: z
        .string()
        .min(6, "Password must be at least 6 characters long."),
      confirmPassword: z
        .string()
        .min(6, "Password confirmation must be at least 6 characters long."),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });

  const form = useForm<formRegister>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<formRegister> = async (data) => {
    setLoading(true);
    try {
      const response = await register(
        data.email,
        data.name,
        data.password,
        data.confirmPassword
      );
      if (response.status === 201 || response.status === 200) {
        toast({
          title: response.message,
          description: "You have successfully registered.",
        });
        navigate("/login");
      } else {
        toast({
          title: response.message,
          description: "Please check your email and password.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Please check your email and password.",
        variant: "destructive",
      });
      console.error("Registration failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper title="Register">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex w-full h-full">
          <div className="relative w-1/2 h-full bg-secondary overflow-hidden">
            <img
              src={AccentSVG}
              alt="Accent Graphic"
              className=" right-[400px] top-[-80px] absolute origin-top-left "
            />
            <img
              src={AccentSVG}
              alt="Accent Graphic"
              className=" right-[200px] top-[-80px] absolute origin-top-left "
            />
            <img
              src={AccentSVG}
              alt="Accent Graphic"
              className=" right-[0px] top-[-80px] absolute origin-top-left "
            />
          </div>
          <div className="w-1/2 h-full flex flex-col items-center justify-center p-8">
            <div className="flex flex-col items-start w-full max-w-md gap-8">
              <div className="space-y-3">
                <h1 className="text-4xl">Create your account</h1>
                <p className="text-gray-500">
                  Please create an account to get started
                </p>
              </div>
              <div className="w-full">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name:</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="example@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="******"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="******"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" variant="default">
                      {loading ? "Registering..." : "Register"}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Register;
