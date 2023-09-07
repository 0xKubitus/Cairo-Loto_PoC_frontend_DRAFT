"use client";

import { useEffect, useState } from "react";

import {
  useAccount,
  // useContractRead,
  useContractWrite,
  useTransactionManager,
  // useWaitForTransaction,
} from "@starknet-react/core";
import { json } from "starknet";

import Balance from "@/components/tickets-balance/tickets-balance";
import environment from "environment";

import styles from "@/styles/mint-btn.module.css";

export default function MintButton({ ...props }) {
  const { account } = useAccount();
  const { addTransaction } = useTransactionManager();
  // const bookKeeper = environment.bookKeeperAddress;

  // use useContractWrite hook to invoke the 'mint()' function from TicketsHandler contract
  const { data: txDataMint, write: writeMint } = useContractWrite({
    calls: [
      {
        contractAddress: environment.nftAddress,
        entrypoint: "mint",
        calldata: [],
      },
    ],
  });

  // Add transaction to the manager once transaction is submitted
  useEffect(() => {
    if (txDataMint) addTransaction({ hash: txDataMint.transaction_hash });
  }, [txDataMint, addTransaction]);

  return (
    <div>
      <div className={styles.userBalanceContainer}>
        <p>Your Tickets Balance:</p>
        {account ? (
          <Balance mintHash={txDataMint?.transaction_hash} account={account} />
        ) : (
          "Please connect your Starknet wallet"
        )}
      </div>

      <button className={styles.buyBtn} onClick={() => writeMint()} {...props}>
        Buy a Ticket for 0.001 ETH
      </button>
    </div>
  );
}
