import DashboardLayout from "@/components/layouts/ExampleLayout";
import { useAuthDeprecated } from "openbase-react-shared";

const Dashboard = () => {
  const { user, isLoading } = useAuthDeprecated();

  return (
    <DashboardLayout>
      <div className="space-y-6">TODO: Add content here</div>
    </DashboardLayout>
  );
};

export default Dashboard;
