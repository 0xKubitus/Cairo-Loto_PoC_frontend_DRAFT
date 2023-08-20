"use client";

import Image from "next/image";

import { useAccount, useContractRead } from "@starknet-react/core";

import ConnectButton from "@/components/wallet/connect-btn";

import styles from "@/styles/header.module.css";

export default function Header() {
  const { account } = useAccount();

  return (
    <header className={styles.header_main}>
      <a href="/">
        <Image
          className={styles.headerLogo}
          src="https://see.fontimg.com/api/renderfont4/L3wZ/eyJyIjoiZnMiLCJoIjoyNiwidyI6MTAwMCwiZnMiOjI2LCJmZ2MiOiIjMDAwMDAwIiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/Q0FJUk8gTE9UTyA/gyptienne-normal.png"
          alt="Egyptian fonts"
          width={120}
          height={24}
        />
      </a>

      <div className={styles.connectBox}>
        <a href="/dashboard">
          {account && (
            <button className={styles.dashboardBtn}>Dashboard</button>
          )}
        </a>

        <ConnectButton />
      </div>
    </header>
  );
}
