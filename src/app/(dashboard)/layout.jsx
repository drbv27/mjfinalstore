import { AppSidebar } from "@/components/layout/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      {children}
    </SidebarProvider>
  );
};

export default DashboardLayout;
