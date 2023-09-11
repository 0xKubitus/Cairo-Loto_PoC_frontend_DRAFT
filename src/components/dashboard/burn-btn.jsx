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

// import styles from "@/styles/burn-btn.module.css";

export default function BurnButton({ token_id }) {
  const { account } = useAccount();
  const { addTransaction } = useTransactionManager();

  const tokenIdLow = token_id.low;
  const tokenIdHigh = token_id.high;

  // use useContractWrite hook to invoke the 'burn()' function from TicketsHandler contract
  const { data: txDataBurn, write: writeBurn } = useContractWrite({
    calls: [
      {
        contractAddress: environment.nftAddress,
        entrypoint: "burn",
        calldata: [tokenIdLow, tokenIdHigh],
      },
    ],
  });

  // Add transaction to the manager once transaction is submitted
  useEffect(() => {
    if (txDataBurn) addTransaction({ hash: txDataBurn.transaction_hash });
  }, [txDataBurn, addTransaction]);

  return <button onClick={() => writeBurn()}>Burn this ticket</button>;
}
