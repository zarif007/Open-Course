"use client";
import React, { useEffect } from "react";
import { ThemeProvider } from "next-themes";
import { NextUIProvider } from "@nextui-org/react";
import Head from "next/head";
import { CssBaseline } from "@nextui-org/react";
import ReduxProvider from "@/redux/Provider";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { v1MainEndpoint } from "@/utils/apiEndpoints";

const queryClient = new QueryClient();
const ClientProviders = ({ children }: { children: React.ReactNode }) => {
  const {user} = useUser()
  // const router = useRouter()
  
  // useEffect(() => {
  //   if(!user?.id) return;
  //   const getUserInfo = async () => {
  //     const { data } = await axios.get(`${v1MainEndpoint}/user/byExternalId/${user?.id}`);
  //     if(!data.data) router.push("/onboarding")
  //   }
  //   getUserInfo()
  // }, [user])

  return (
    <ReduxProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <NextUIProvider>
            <Head>{CssBaseline.flush()}</Head>
            {children}
          </NextUIProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
};

export default ClientProviders;
