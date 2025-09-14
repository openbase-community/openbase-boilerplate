import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useAuthDeprecated } from "openbase-react";

const Dashboard = () => {
  const { user, isLoading } = useAuthDeprecated();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-serif font-light">
          {isLoading ? "Loading..." : `Welcome, ${user?.first_name || "User"}`}
        </h1>
        TODO: Add content here
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
