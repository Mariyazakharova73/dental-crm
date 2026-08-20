"use client";

import { cn } from "@/shared/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface EntityDetailNavItem {
  label: string;
  href: string;
  exact?: boolean;
}

interface EntityDetailNavProps {
  ariaLabel: string;
  items: readonly EntityDetailNavItem[];
}

function isNavItemActive(pathname: string, href: string, exact?: boolean) {
  if (exact) {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function EntityDetailNav({ ariaLabel, items }: EntityDetailNavProps) {
  const pathname = usePathname() ?? "";

  return (
    <nav aria-label={ariaLabel} className="border-b">
      <ul className="-mb-px flex gap-1 overflow-x-auto">
        {items.map((item) => {
          const active = isNavItemActive(pathname, item.href, item.exact);

          return (
            <li key={item.href} className="shrink-0">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex h-9 items-center border-b-2 px-3 text-sm font-medium whitespace-nowrap transition-colors",
                  active
                    ? "border-foreground text-foreground"
                    : "text-muted-foreground hover:text-foreground border-transparent",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
