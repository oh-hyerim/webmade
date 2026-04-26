import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import ProjectRequest from "../pages/project-request/page";
import AdminLogin from "../pages/admin/login/page";
import AdminDashboard from "../pages/admin/dashboard/page";
import AdminProjectRequests from "../pages/admin/project-requests/page";
import ProtectedRoute from "../components/feature/ProtectedRoute";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/project-request",
    element: <ProjectRequest />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/project-requests",
    element: (
      <ProtectedRoute>
        <AdminProjectRequests />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
