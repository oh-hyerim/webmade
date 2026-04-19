import { RouteObject } from 'react-router-dom';
import HomePage from '@/pages/home/page';
import CasesPage from '@/pages/cases/page';
import ContactPage from '@/pages/contact/page';
import PricingPage from '@/pages/pricing/page';
import RequestRoute from '@/pages/request/RequestRoute';
import ContractOnlyPage from '@/pages/contract-only/page';
import AdminPage from '@/pages/admin/page';
import AdminLoginPage from '@/pages/admin/login/page';
import ProtectedRoute from '@/components/ProtectedRoute';
import NotFound from '@/pages/NotFound';
import PrivacyPage from '@/pages/privacy/page';

const routes: RouteObject[] = [
  { path: '/', element: <HomePage /> },
  { path: '/cases', element: <CasesPage /> },
  { path: '/pricing', element: <PricingPage /> },
  { path: '/contact', element: <ContactPage /> },
  { path: '/privacy', element: <PrivacyPage /> },
  { path: '/contract-only', element: <ContractOnlyPage /> },
  { path: '/request', element: <RequestRoute /> },
  { path: '/admin/login', element: <AdminLoginPage /> },
  { path: '/admin', element: <ProtectedRoute><AdminPage /></ProtectedRoute> },
  { path: '*', element: <NotFound /> },
];

export default routes;
