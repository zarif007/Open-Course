'use client';

import React from 'react';
import { ThemeProvider } from 'next-themes';
import { NextUIProvider } from '@nextui-org/react';
import ReduxProvider from '@/redux/Provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SocketProvider } from '@/context/SocketProvider';

const queryClient = new QueryClient();

const ClientProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ReduxProvider>
        <SocketProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
              <SpeedInsights />
              <NextUIProvider>{children}</NextUIProvider>
            </ThemeProvider>
          </QueryClientProvider>
        </SocketProvider>
      </ReduxProvider>
    </SessionProvider>
  );
};

export default ClientProviders;
