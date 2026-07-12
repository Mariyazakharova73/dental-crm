"use client";

import { Stethoscope } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { routes } from "@/shared/config/routes";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/ui/sidebar";
import { isNavItemActive } from "../lib/is-nav-item-active";
import { useCloseMobileSidebar } from "../model/use-close-mobile-sidebar";

export function SidebarLogo() {
  const pathname = usePathname();
  const closeMobileSidebar = useCloseMobileSidebar();

  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            render={<Link href={routes.home} />}
            isActive={isNavItemActive(pathname, "/dashboard")}
            onClick={closeMobileSidebar}
          >
            <div className="bg-primary text-primary-foreground flex aspect-square size-9 items-center justify-center rounded-lg">
              <Stethoscope className="size-5" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">Dental CRM</span>
              <span className="text-muted-foreground truncate text-xs">
                Стоматология
              </span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}
