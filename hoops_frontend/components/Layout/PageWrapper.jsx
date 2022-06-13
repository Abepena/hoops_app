import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Navbar from "components/Navbars/Navbar";

function PageWrapper({ children }) {
  return (
    <div className="mx-auto h-full "> 
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default PageWrapper;
