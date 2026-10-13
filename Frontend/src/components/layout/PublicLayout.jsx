import React from "react";
import { Outlet } from "react-router-dom";

import ContactFormPopup from "../../pages/ContactFormPopup";
import Footer from "../../pages/Footer";
import Navbar from "../../pages/Navbar";

const PublicLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <ContactFormPopup />
    <Footer />
  </>
);

export default PublicLayout;
