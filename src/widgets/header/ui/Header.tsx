"use client";

import { Separator } from "@/shared/ui/separator";
import { SidebarTrigger } from "@/shared/ui/sidebar";

import { HeaderActions } from "./HeaderActions";
import { HeaderBreadcrumbs } from "./HeaderBreadcrumbs";

export function Header() {
  return (
    <header className="bg-background flex h-14 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1 cursor-pointer" />
      <Separator orientation="vertical" className="mr-2 hidden h-4 sm:block" />
      <HeaderBreadcrumbs />
      <HeaderActions />
    </header>
  );
}
