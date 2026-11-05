import { useLayoutEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import { Header } from "@/shared/ui/wedgets/header/header";
import { HomePage } from "./pages/home-page/home-page";
import ContactsPage from "./pages/contacts-Page";
import { useAnimatedFavicon } from "./shared/lib/useAnimatedFavicon";

import styles from "./pages/home-page/home-page.module.css";

function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

export default function App() {
  useAnimatedFavicon();

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <div className={styles.page}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contacts" element={<ContactsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
