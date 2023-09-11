"use client";

import { useEffect, useState } from "react";

import {
  useAccount,
  useContractRead,
  useWaitForTransaction,
} from "@starknet-react/core";
import { json } from "starknet";

import ticketNft from "@/assets/abis/abi_TicketsHandler_v0.4.json"; // make sure to import the latest TicketsHandler version's abi
import environment from "environment";

// import styles from "@/styles/tickets-balance.module.css";

// Compiled ABI for my 'Tickets' contract
const compiledTicketNft = json.parse(JSON.stringify(ticketNft));

// Fetching balance of an account
const Balance = ({ account, mintHash }) => {
  // Internal state representing the current balance of the account
  const [balance, setBalance] = useState(0);

  // use useWaitForTransaction hook to wait for the mint transaction to be accepted on L2 -> Use to refresh the balance after mint
  const { data } = useWaitForTransaction({ hash: mintHash, watch: true });

  // use useContractRead hook to fetch the balance of the account
  const { data: tokenBalanceData, refetch } = useContractRead({
    address: environment.nftAddress,
    abi: compiledTicketNft,
    functionName: "balanceOf",
    args: [account.address],
  });

  // Set the internal state balance when the tokenBalanceData is fetched
  useEffect(() => {
    if (tokenBalanceData) {
      setBalance(tokenBalanceData.balance.low);
    }
  }, [tokenBalanceData]);

  // Refresh the balance when the mint transaction is accepted on L2
  useEffect(() => {
    if (data && data.status === "ACCEPTED_ON_L2") refetch();
  }, [refetch, data]);

  // console.log("balance = ", balance); // -> 2n
  // console.log("typeof balance = ", typeof balance); // -> bigint
  // console.log("balance.valueOf() = ", balance.valueOf()); // -> 2n
  // console.log(tokenBalanceData); // => { balance: {high: 0n, low: 2n} }

  return <span>{balance.toString()}</span>;
};

export default Balance;
