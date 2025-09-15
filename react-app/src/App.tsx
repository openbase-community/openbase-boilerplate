import {
  AnonymousRoute,
  AuthChangeRedirector,
  AuthContextProvider,
} from "openbase-react-shared";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Redirect />} />
      <Route
        path="/account/login"
        element={
          <AnonymousRoute>
            <Login />
          </AnonymousRoute>
        }
      />
      <Route path="/contact" element={<Contact />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/settings" element={<Settings />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <AuthChangeRedirector>
          <AppRoutes />
        </AuthChangeRedirector>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
