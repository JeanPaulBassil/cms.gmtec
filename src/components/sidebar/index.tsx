'use client';

import { Image, ScrollShadow, Spacer } from '@heroui/react';
import { usePathname } from 'next/navigation';
import React from 'react';

import { useSidebar } from '../providers/SidebarProvider';
import UserSettingsDropdown from '../user/UserSettingsDropdown';
import Sidebar, { SidebarItem } from './Sidebar';

// Sidebar items
export const sidebarItems: SidebarItem[] = [
  {
    key: 'overview',
    title: 'Overview',
    items: [
      {
        key: 'dashboard',
        href: '/dashboard',
        icon: 'solar:home-linear',
        title: 'Dashboard',
      }
    ],
  },
];

/**
 * 💡 TIP: You can use the usePathname hook from Next.js App Router to get the current pathname
 * and use it as the active key for the Sidebar component.
 *
 * ```tsx
 * import {usePathname} from "next/navigation";
 *
 * const pathname = usePathname();
 * const currentPath = pathname.split("/")?.[1]
 *
 * <Sidebar defaultSelectedKey="home" selectedKeys={[th]} />
 * ```
 */
export default function AppWrapper() {
  const pathname = usePathname();
  // Extract the first segment of the path
  const currentPath = pathname?.split('/')?.[1] || '';

  // Map path to sidebar key
  const getSelectedKey = () => {
    return 'dashboard';
  };

  const { isSidebarOpen, toggleSidebar } = useSidebar();

  // Determine default selected key based on current path
  const activeKey = getSelectedKey();

  return (
    <div className="h-full min-h-[48rem] relative">
      {/* Sidebar container with dynamic width */}
      <div
        className={`relative flex h-full flex-1 flex-col bg-[#3B82F6] transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'w-72 p-6' : 'w-0 p-0 overflow-hidden'
        }`}
      >
        {/* Header with logo */}
        <div className="flex items-center gap-2 px-2 mb-2">
          <Image src="/Gemtec logo.png" alt="Gemtec logo" width={isSidebarOpen ? 200 : 0} height={100} />
        </div>

        {/* Sidebar content */}
        {isSidebarOpen && (
          <ScrollShadow className="-mr-6 h-full max-h-full py-6 pr-6">
            <Sidebar
              defaultSelectedKey={activeKey}
              selectedKeys={[activeKey]}
              iconClassName="text-primary-foreground/60 group-data-[selected=true]:text-primary-foreground"
              itemClasses={{
                title:
                  'text-primary-foreground/60 group-data-[selected=true]:text-primary-foreground',
              }}
              items={sidebarItems}
              sectionClasses={{
                heading: 'text-primary-foreground/80',
              }}
              variant="flat"
            />
          </ScrollShadow>
        )}

        <Spacer y={8} />

        {/* Footer with user settings */}
        {isSidebarOpen && (
          <div className="mt-auto flex flex-col">
            <div className="flex items-center gap-3 px-2">
              <div className="flex flex-col"></div>
            </div>
            <UserSettingsDropdown variant="sidebar" />
          </div>
        )}
      </div>

      {/* Toggle button positioned in the middle of the sidebar edge */}
      <div
        style={{
          left: isSidebarOpen ? '18rem' : '0', // Using style for smooth transition
          transition: 'left 0.3s ease-in-out, background-color 0.2s',
        }}
        className={`absolute top-1/2 -translate-y-1/2 z-20 bg-[#3B82F6] text-white shadow-md hover:bg-[#2563EB] hover:shadow-lg h-10 w-6 p-0 min-w-0 rounded-r-md ${
          isSidebarOpen ? 'border-l border-white/20' : ''
        }`}
      >
        <button
          aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          className="w-full h-full flex items-center justify-center"
          onClick={toggleSidebar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-300 ${isSidebarOpen ? 'rotate-180' : ''}`}
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
