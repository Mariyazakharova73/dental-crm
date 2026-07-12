import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
import { Header } from "@/widgets/header";
import { AppSidebar } from "@/widgets/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider >
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
