"use client";
import React from "react";
import { ThemeProvider } from "next-themes";
import { NextUIProvider } from "@nextui-org/react";
import Head from "next/head";
import { CssBaseline } from "@nextui-org/react";
import ReduxProvider from "@/redux/Provider";

const ClientProviders = ({ children }: { children: any }) => {
  return (
    <ReduxProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <NextUIProvider>
          <Head>{CssBaseline.flush()}</Head>
          {children}
        </NextUIProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
};

export default ClientProviders;
