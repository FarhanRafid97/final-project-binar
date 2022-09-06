import { Box } from "@chakra-ui/react";
import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Box minH="100vh" py={20} bg="#242424">
        {children}
      </Box>

      <Footer />
    </>
  );
};

export default Layout;
