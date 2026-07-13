"use client";

import { LogOut, Settings, User } from "lucide-react";

import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

export function HeaderUserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="cursor-pointer"
        render={
          <Button
            variant="ghost"
            className="h-8 w-auto gap-2 rounded-full px-2"
          >
            <Avatar className="size-7">
              <AvatarFallback className="text-xs">АД</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">Админ</span>
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        <DropdownMenuItem disabled>
          <User className="size-4" />
          Профиль
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Settings className="size-4" />
          Настройки
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" disabled>
          <LogOut className="size-4" />
          Выйти
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
