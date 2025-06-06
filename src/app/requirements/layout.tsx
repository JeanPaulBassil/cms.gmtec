'use client';

import React from 'react';
import AppWrapper from '@/components/sidebar';
import { SidebarProvider } from '@/components/providers/SidebarProvider';

export default function RequirementsLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppWrapper />
        <main className="flex-1 overflow-y-auto transition-all duration-300 ease-in-out">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
} 