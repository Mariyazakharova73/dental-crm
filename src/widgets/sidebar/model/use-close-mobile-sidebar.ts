"use client";

import { useSidebar } from "@/shared/ui/sidebar";

export function useCloseMobileSidebar() {
  const { isMobile, setOpenMobile } = useSidebar();

  return () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };
}
