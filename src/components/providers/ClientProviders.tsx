"use client";

import React, { useEffect } from "react";
import { ThemeProvider } from "next-themes";
import { NextUIProvider } from "@nextui-org/react";
import Head from "next/head";
import { CssBaseline } from "@nextui-org/react";
import ReduxProvider from "@/redux/Provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import OnboardingProvider from "./OnboardingProvider";
import SocketProvide from "./SocketProvide";

const queryClient = new QueryClient();
const ClientProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <NextUIProvider>
            <OnboardingProvider>
              <SocketProvide>
                <Head>{CssBaseline.flush()}</Head>
                {children}
              </SocketProvide>
            </OnboardingProvider>
          </NextUIProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
};

export default ClientProviders;
