import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

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
