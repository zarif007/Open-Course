import React, { useState } from "react";
import { Input } from "../ui/Input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { useForm } from "react-hook-form";
import registerInputsSchema from "@/validations/auth/register";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/Button";
import axios from "axios";
import { nextApiEndPoint } from "@/utils/apiEndpoints";
import { toast } from "../ui/Toast";
import { useRouter } from "next/navigation";

const RegistrationForm = () => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof registerInputsSchema>>({
    resolver: zodResolver(registerInputsSchema),
  });

  const errorToast = (errorMsg: string) => {
    toast({
      title: "Complete required fields",
      type: "error",
      message: errorMsg,
    });
  };

  const onSubmit = async (data: z.infer<typeof registerInputsSchema>) => {
    if (loading) return;
    setLoading(true);
    try {
      const { name, email, password } = data;

      const { data: response } = await axios.post(
        `${nextApiEndPoint}/user/register`,
        {
          name,
          email,
          password,
        }
      );

      if (!response.success) {
        errorToast(response.message);
        return;
      }

      toast({
        title: "Success",
        type: "success",
        message: "User Created Successfully",
      });

      router.push("/login");
    } catch {
      errorToast("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Chuck Norris"
                    className="text-sm font-semibold"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="gmail@norris.com"
                    className="text-sm font-semibold"
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
              <FormItem className="my-2">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Some thing Crazy ###~!Y&*"
                    className="text-sm font-semibold"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full mt-4" isLoading={loading}>
            Register
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegistrationForm;
