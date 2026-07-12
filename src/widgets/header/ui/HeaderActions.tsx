"use client";

import { Bell } from "lucide-react";

import { Button } from "@/shared/ui/button";

import { HeaderUserMenu } from "./HeaderUserMenu";
import { ThemeToggle } from "./ThemeToggle";

export function HeaderActions() {
  return (
    <div className="ml-auto flex items-center gap-2">
      <ThemeToggle />
      <Button variant="ghost" size="icon" aria-label="Уведомления" disabled>
        <Bell className="size-4" />
      </Button>
      <HeaderUserMenu />
    </div>
  );
}
