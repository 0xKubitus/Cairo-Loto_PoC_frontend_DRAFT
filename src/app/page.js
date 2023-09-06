"use client";

import Image from "next/image";

import ApproveButton from "@/components/nft/approve-btn";
import MintButton from "@/components/nft/mint-btn";
import CurrentTransaction from "@/components/transactions/current-transaction";
import TransactionsList from "@/components/transactions/transaction-list";

import styles from "@/styles/homepage.module.css";

export default function Home() {
  return (
    <div className={styles.mainContainer}>
      <h2>On-chain Lottery dApp on Starknet</h2>
      <h4>(Proof of Concept - Deployed on Goerli Testnet)</h4>

      <div className={styles.homepageBtnsDiv}>
        <button className={styles.infoBtn}>MORE INFO</button>

        <ApproveButton />
        <MintButton />

        <CurrentTransaction />

        <TransactionsList />
      </div>
    </div>
  );
}
