import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

import styles from "@/styles/base-layout.module.css";

const BaseLayout = ({ children }) => {
  return (
    <>
      <Header />

      <main>{children}</main>

      <Footer />
    </>
  );
};

export default BaseLayout;
