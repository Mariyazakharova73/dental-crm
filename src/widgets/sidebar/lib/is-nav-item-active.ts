import { routes } from "@/shared/config/routes";

export function isNavItemActive(pathname: string, href: string) {
  if (href === routes.home) {
    return pathname === routes.home || pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
