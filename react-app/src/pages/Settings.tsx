import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertTriangle,
  CheckCircle,
  Trash2,
  User,
  XCircle,
} from "lucide-react";
import { useAuthDeprecated } from "openbase-react";
import React, { useState } from "react";

const Settings: React.FC = () => {
  const { user } = useAuthDeprecated();
  const [isClearing, setIsClearing] = useState(false);
  const [clearSuccess, setClearSuccess] = useState(false);
  const [clearError, setClearError] = useState<string | null>(null);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-serif font-light mb-2">Settings</h1>
          <p className="text-gray-600">
            Manage your account preferences and data
          </p>
        </div>

        {/* Account Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Account Information
            </CardTitle>
            <CardDescription>Your personal account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <p className="text-gray-900 font-medium">{user?.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Name
                </label>
                <p className="text-gray-900 font-medium">
                  {user?.first_name} {user?.last_name}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Management Card */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <Trash2 className="h-5 w-5" />
              Data Management
            </CardTitle>
            <CardDescription>
              Permanently delete all your data and conversation history
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>Warning:</strong> This will permanently delete all your
                message history and conversations. This action cannot be undone.
              </AlertDescription>
            </Alert>

            {clearSuccess && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  <strong>Success!</strong> Your data has been cleared
                  successfully.
                </AlertDescription>
              </Alert>
            )}

            {clearError && (
              <Alert className="border-red-200 bg-red-50">
                <XCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  <strong>Error:</strong> {clearError}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
