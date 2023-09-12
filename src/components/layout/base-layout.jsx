"use client";

import { useState, createContext } from "react";

import { useAccount, useContractRead } from "@starknet-react/core";
import { json } from "starknet";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

import styles from "@/styles/base-layout.module.css";

const UserAccountContext = createContext();

const BaseLayout = ({ children }) => {
  const { account } = useAccount();
  const [userAccount, setUserAccount] = useState({});

  return (
    <UserAccountContext.Provider value={userAccount}>
      <Header />

      <main>{children}</main>

      <Footer />
    </UserAccountContext.Provider>
  );
};

export default BaseLayout;
