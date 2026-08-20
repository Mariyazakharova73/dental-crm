import {
  BriefcaseMedical,
  Calendar,
  ClipboardList,
  LayoutDashboard,
  Stethoscope,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { routes } from "./routes";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  keywords?: string[];
  disabled?: boolean;
}

const routeLabels: Record<string, string> = {
  dashboard: "Главная",
  patients: "Пациенты",
  doctors: "Врачи",
  appointments: "Записи",
  services: "Услуги",
  finance: "Финансы",
  tasks: "Задачи",
  create: "Создание",
  payments: "Финансы",
  documents: "Документы",
};

export const navigationItems: NavItem[] = [
  {
    title: routeLabels.dashboard,
    href: routes.home,
    icon: LayoutDashboard,
    keywords: ["dashboard", "дашборд", "статистика"],
  },
  {
    title: routeLabels.patients,
    href: routes.patients,
    icon: Users,
    keywords: ["patient", "клиент"],
  },
  {
    title: routeLabels.doctors,
    href: routes.doctors,
    icon: Stethoscope,
    keywords: ["doctor", "специалист"],
  },
  {
    title: routeLabels.appointments,
    href: routes.appointments,
    icon: Calendar,
    keywords: ["appointment", "календарь", "приём"],
  },
  {
    title: routeLabels.services,
    href: routes.services,
    icon: BriefcaseMedical,
    keywords: ["service", "прайс"],
  },
  {
    title: routeLabels.finance,
    href: routes.finance,
    icon: Wallet,
    keywords: ["finance", "доход", "аналитика"],
    disabled: true,
  },
  {
    title: routeLabels.tasks,
    href: routes.tasks,
    icon: ClipboardList,
    keywords: ["task", "kanban", "доска"],
    disabled: true,
  },
];

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function getBreadcrumbs(pathname: string): BreadcrumbItem[] {
  if (pathname === "/" || pathname === routes.home) {
    return [{ label: routeLabels.dashboard }];
  }

  const segments = pathname.split("/").filter(Boolean);
  const crumbs: BreadcrumbItem[] = [
    { label: routeLabels.dashboard, href: routes.home },
  ];

  let path = "";
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    path += `/${segment}`;
    const isLast = i === segments.length - 1;
    const isId = /^\d+$/.test(segment);
    const label = isId ? "Карточка" : (routeLabels[segment] ?? segment);

    crumbs.push({
      label,
      href: isLast ? undefined : path,
    });
  }

  return crumbs;
}
