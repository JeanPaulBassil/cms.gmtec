'use client';

import { HeroUIProvider, ToastProvider as HeroUIToastProvider } from '@heroui/react';
import React from 'react';

import { ToastProvider } from '@/contexts/ToastContext';
import { ReactQueryProvider } from '@/providers/ReactQueryProvider';
import { ApiErrorProvider } from './ApiErrorProvider';
import { AuthProvider } from './AuthProvider';
import { AuthWrapper } from './AuthWrapper';
import { SidebarProvider } from './SidebarProvider';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ReactQueryProvider>
      <ApiErrorProvider>
        <ToastProvider>
          <AuthProvider>
            <AuthWrapper>
              <SidebarProvider>
                <HeroUIProvider>
                  <HeroUIToastProvider />
                  {children}
                </HeroUIProvider>
              </SidebarProvider>
            </AuthWrapper>
          </AuthProvider>
        </ToastProvider>
      </ApiErrorProvider>
    </ReactQueryProvider>
  );
}
