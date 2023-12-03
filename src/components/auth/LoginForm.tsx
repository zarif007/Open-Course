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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/Button";
import axios from "axios";
import { nextApiEndPoint } from "@/utils/apiEndpoints";
import { toast } from "../ui/Toast";
import { useRouter, useSearchParams } from "next/navigation";
import loginInputsSchema from "@/validations/auth/login";
import { signIn } from "next-auth/react";

const LoginForm = () => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const searchParams = useSearchParams();

  const callbackUrl = searchParams?.get("callbackUrl") ?? "/";

  const form = useForm<z.infer<typeof loginInputsSchema>>({
    resolver: zodResolver(loginInputsSchema),
  });

  const errorToast = (errorMsg: string) => {
    toast({
      title: "Error",
      type: "error",
      message: errorMsg,
    });
  };

  const onSubmit = async (data: z.infer<typeof loginInputsSchema>) => {
    if (loading) return;
    setLoading(true);
    try {
      const { email, password } = data;

      // Check conditions here

      const { data: response } = await axios.post(
        `${nextApiEndPoint}/user/checkUser`,
        {
          email,
          password,
        }
      );

      if (!response.success) {
        errorToast(response.message);
        return;
      }

      await signIn(
        "credentials",
        { callbackUrl },
        {
          email,
          password,
        }
      );

      toast({
        title: "Success",
        type: "success",
        message: "Logged In Successfully",
      });
    } catch {
      errorToast("Something went wrong");
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
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
