import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import IndexNavbar from "components/Navbars/NavbarIndex";

function PageWrapper({ children }) {
  return (
    <div className="mx-auto h-full "> 
      <IndexNavbar />
      {children}
      <Footer />
    </div>
  );
}

export default PageWrapper;
