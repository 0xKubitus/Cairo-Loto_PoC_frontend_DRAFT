import Image from "next/image";

import ConnectButton from "@/components/wallet/connect-btn";

import styles from "@/styles/header.module.css";

export default function Header() {
  return (
    <header className={styles.header_main}>
      <a href="#Home">
        <Image
          className={styles.headerLogo}
          src="https://see.fontimg.com/api/renderfont4/L3wZ/eyJyIjoiZnMiLCJoIjoyNiwidyI6MTAwMCwiZnMiOjI2LCJmZ2MiOiIjMDAwMDAwIiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/Q0FJUk8gTE9UTyA/gyptienne-normal.png"
          alt="Egyptian fonts"
          width={120}
          height={24}
        />
      </a>

      <div className={styles.connectBox}>
        {/* <button className={styles.connectBtn}>Connect Wallet</button> */}
        {/* TODO: REPLACE BTN WITH A COMPONENT DEDICATED TO "WALLET-CONNECT" */}
        <ConnectButton />
      </div>
    </header>
  );
}
