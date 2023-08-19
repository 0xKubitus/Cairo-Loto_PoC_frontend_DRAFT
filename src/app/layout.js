import "./globals.css";
import { Inter } from "next/font/google";

import BaseLayout from "@/components/layout/base-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cairo Loto - PoC",
  description: "On-chain decentralized lottery app deployed on Starknet",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BaseLayout>{children}</BaseLayout>
      </body>
    </html>
  );
}
