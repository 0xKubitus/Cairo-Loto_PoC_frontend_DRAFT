"use client";

import { useState, useEffect } from "react";

import { useContractRead, useWaitForTransaction } from "@starknet-react/core";
import { json } from "starknet";

import ticketNft from "@/assets/abis/abi_TicketsHandler_v0.4.json"; // make sure to import the latest TicketsHandler version's abi
import environment from "environment";

// Compiled ABI for my 'Tickets' contract
const compiledTicketNft = json.parse(JSON.stringify(ticketNft));

// Fetching balance of an account
const TicketsDetails = ({ account, burnHash }) => {
  // #########################################################################
  // TICKETS BALANCE

  // Internal state representing the current balance of the account
  const [balance, setBalance] = useState(0);

  // use useWaitForTransaction hook to wait for the burn transaction to be accepted on L2 -> Use to refresh the balance after burn
  const { data } = useWaitForTransaction({ hash: burnHash, watch: true });

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

  // Refresh the balance when the burn transaction is accepted on L2
  useEffect(() => {
    if (data && data.status === "ACCEPTED_ON_L2") refetch();
  }, [refetch, data]);

  // #########################################################################

  return <p>You possess: {balance.toString()} tickets</p>;
};

export default function Gallery({ account }) {
  return (
    <div>
      <p>Gallery</p>
      <TicketsDetails account={account} />
    </div>
  );
}
