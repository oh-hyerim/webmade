import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import Services from "../pages/services/page";
import Work from "../pages/work/page";
import Portfolio from "../pages/portfolio/page";
import Pricing from "../pages/pricing/page";
import Process from "../pages/process/page";
import Faq from "../pages/faq/page";
import About from "../pages/about/page";
import Contact from "../pages/contact/page";
import Privacy from "../pages/privacy/page";
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
    path: "/Services",
    element: <Navigate to="/services" replace />,
  },
  {
    path: "/services",
    element: <Services />,
  },
  {
    path: "/Work",
    element: <Navigate to="/work" replace />,
  },
  {
    path: "/portfolio",
    element: <Portfolio />,
  },
  {
    path: "/work",
    element: <Work />,
  },
  {
    path: "/Pricing",
    element: <Navigate to="/pricing" replace />,
  },
  {
    path: "/pricing",
    element: <Pricing />,
  },
  {
    path: "/Process",
    element: <Navigate to="/process" replace />,
  },
  {
    path: "/process",
    element: <Process />,
  },
  {
    path: "/faq",
    element: <Faq />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/privacy",
    element: <Privacy />,
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
