import { BrowserRouter, useLocation } from "react-router-dom";
import { AppRoutes } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import FloatingKakao from "@/components/feature/FloatingKakao";

function Layout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  return (
    <>
      {!isAdmin && <Navbar />}
      <AppRoutes />
      {!isAdmin && <Footer />}
      {!isAdmin && <FloatingKakao />}
    </>
  );
}

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter basename={__BASE_PATH__}>
        <Layout />
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;
