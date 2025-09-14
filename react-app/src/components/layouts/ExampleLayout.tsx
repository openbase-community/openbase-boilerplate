import ChatButton from "@/components/ChatButton";
import NotificationButton from "@/components/NotificationButton";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import UserProfile from "@/components/UserProfile";
import {
  Activity,
  BookOpen,
  Clipboard,
  Clock,
  Database,
  FileText,
  Home,
  HousePlus,
  PieChart,
  Search,
  User,
  Wallet,
} from "lucide-react";
import { useAuthDeprecated } from "openbase-react";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface ExampleDashboardLayoutProps {
  children: React.ReactNode;
}

const ExampleDashboardLayout: React.FC<ExampleDashboardLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoading } = useAuthDeprecated();

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      const hostname = window.location.hostname;
      const isDevelopmentEnvironment =
        hostname === "localhost" ||
        hostname.endsWith(".lovable.app") ||
        hostname.endsWith(".lovable.dev") ||
        hostname.endsWith(".lovableproject.com");

      if (!isDevelopmentEnvironment) {
        console.log("Redirecting to login");
        console.log(hostname);
        navigate("/login");
      }
    }
  }, [user, isLoading, navigate]);

  // Navigation items with their respective paths, icons, and titles
  const navItems = [
    {
      path: "/dashboard",
      icon: Home,
      title: "Dashboard",
    },
    {
      path: "/dashboard/profile",
      icon: User,
      title: "Profile",
    },
    {
      path: "/dashboard/analytics",
      icon: PieChart,
      title: "Analytics",
    },
    {
      path: "/dashboard/projects",
      icon: Clipboard,
      title: "Projects",
    },
    {
      path: "/dashboard/data",
      icon: Database,
      title: "Data",
    },
    {
      path: "/dashboard/activity",
      icon: Activity,
      title: "Activity",
    },
    {
      path: "/dashboard/search",
      icon: Search,
      title: "Search",
    },
    {
      path: "/dashboard/reports",
      icon: FileText,
      title: "Reports",
    },
    {
      path: "/dashboard/settings",
      icon: HousePlus,
      title: "Settings",
    },
  ];

  // Additional items for advanced users
  const advancedItems = [
    {
      path: "/dashboard/resources",
      icon: BookOpen,
      title: "Resources",
    },
    {
      path: "/dashboard/timeline",
      icon: Clock,
      title: "Timeline",
    },
    {
      path: "/dashboard/wallet",
      icon: Wallet,
      title: "Wallet",
    },
  ];

  // Check if user has advanced features enabled
  const hasAdvancedFeatures = user?.settings?.advanced_features || false;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <Sidebar>
          <SidebarHeader className="p-4 border-b">
            <div className="flex items-center justify-start py-2">
              <h1 className="text-xl font-bold text-gray-900">App Logo</h1>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton
                        isActive={location.pathname === item.path}
                        onClick={() => navigate(item.path)}
                        tooltip={item.title}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Advanced section - only show for users with advanced features */}
            {hasAdvancedFeatures && (
              <SidebarGroup>
                <SidebarGroupLabel>Advanced</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {advancedItems.map((item) => (
                      <SidebarMenuItem key={item.path}>
                        <SidebarMenuButton
                          isActive={location.pathname === item.path}
                          onClick={() => navigate(item.path)}
                          tooltip={item.title}
                        >
                          <item.icon />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 overflow-auto">
          <header className="bg-white shadow-sm border-b h-16 flex items-center px-6 sticky top-0 z-10">
            <div className="flex-1 flex justify-between items-center">
              <h2 className="text-xl text-gray-900 font-sans">
                {isLoading
                  ? "Loading..."
                  : `Welcome back, ${user?.first_name || "User"}`}
              </h2>
              <div className="flex items-center space-x-1">
                <ChatButton />
                <NotificationButton />
                <UserProfile />
              </div>
            </div>
          </header>
          <main className="w-full p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ExampleDashboardLayout;
