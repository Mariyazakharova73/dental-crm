"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { navigationItems } from "@/shared/config/navigation";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/ui/sidebar";
import { isNavItemActive } from "../lib/is-nav-item-active";
import { useCloseMobileSidebar } from "../model/use-close-mobile-sidebar";

export function SidebarNav() {
  const pathname = usePathname();
  const closeMobileSidebar = useCloseMobileSidebar();

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Навигация</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu className="gap-2">
            {navigationItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  render={item.disabled ? undefined : <Link href={item.href} />}
                  aria-disabled={item.disabled}
                  className={cn(
                    "h-9 [&_svg]:size-5",
                    item.disabled &&
                      "text-muted-foreground cursor-not-allowed opacity-50",
                  )}
                  isActive={
                    !item.disabled && isNavItemActive(pathname, item.href)
                  }
                  tooltip={item.disabled ? "Скоро" : item.title}
                  onClick={
                    item.disabled
                      ? (event) => event.preventDefault()
                      : closeMobileSidebar
                  }
                >
                  <item.icon />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}
