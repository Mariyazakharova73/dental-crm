"use client";

import { Sidebar, SidebarRail } from "@/shared/ui/sidebar";
import { SidebarLogo } from "./SidebarLogo";
import { SidebarNav } from "./SidebarNav";

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarLogo />
      <SidebarNav />
      <SidebarRail />
    </Sidebar>
  );
}
