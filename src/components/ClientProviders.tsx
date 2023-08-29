"use client";

import React, { useEffect } from "react";
import { ThemeProvider } from "next-themes";
import { NextUIProvider } from "@nextui-org/react";
import Head from "next/head";
import { CssBaseline } from "@nextui-org/react";
import ReduxProvider from "@/redux/Provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import OnboardingProvide from "./OnboardingProvide";

const queryClient = new QueryClient();
const ClientProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <NextUIProvider>
            <OnboardingProvide>
              <Head>{CssBaseline.flush()}</Head>
              {children}
            </OnboardingProvide>
          </NextUIProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
};

export default ClientProviders;
