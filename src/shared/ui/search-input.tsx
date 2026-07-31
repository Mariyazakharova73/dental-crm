"use client";

import { Input } from "@/shared/ui/input";
import { cn } from "@/shared/utils";
import { SearchIcon } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Поиск...",
  className,
}: SearchInputProps) {
  return (
    <div className={cn("relative w-full sm:max-w-sm", className)}>
      <SearchIcon className="text-muted-foreground absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-8"
      />
    </div>
  );
}
