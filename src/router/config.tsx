import { RouteObject } from 'react-router-dom';
import HomePage from '@/pages/home/page';
import CasesPage from '@/pages/cases/page';
import ContactPage from '@/pages/contact/page';
import PricingPage from '@/pages/pricing/page';
import RequestPage from '@/pages/request/page';
import AdminPage from '@/pages/admin/page';
import AdminLoginPage from '@/pages/admin/login/page';
import ProtectedRoute from '@/pages/admin/components/ProtectedRoute';
import NotFound from '@/pages/NotFound';

const routes: RouteObject[] = [
  { path: '/', element: <HomePage /> },
  { path: '/cases', element: <CasesPage /> },
  { path: '/pricing', element: <PricingPage /> },
  { path: '/contact', element: <ContactPage /> },
  { path: '/request', element: <RequestPage /> },
  { path: '/admin/login', element: <AdminLoginPage /> },
  { path: '/admin', element: <ProtectedRoute><AdminPage /></ProtectedRoute> },
  { path: '*', element: <NotFound /> },
];

export default routes;
