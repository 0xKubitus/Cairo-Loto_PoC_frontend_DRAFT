"use client";

import { useState, useEffect } from "react";

import { useContractRead, useWaitForTransaction } from "@starknet-react/core";
import { json } from "starknet";

import GetTicketsId from "../dashboard/getTicketsId";
import ticketNft from "@/assets/abis/abi_TicketsHandler_v0.4.3.json"; // make sure to import the latest TicketsHandler version's abi
import environment from "environment";

import styles from "@/styles/gallery.module.css";

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

  // ----------------------------------------------------------------
  // // Refresh the balance when the burn transaction is accepted on L2
  // useEffect(() => {
  //   if (data && data.status === "ACCEPTED_ON_L2") refetch();
  // }, [refetch, data]);

  // THE ABOVE CURRENTLY DOES NOT WORK
  // I suppose this is because the burn is implemented in another component than here,
  // where the state of the user's tickets balance is determined...
  // I think using the useContext hook can solve the issue?
  // ----------------------------------------------------------------
  // #########################################################################

  // #########################################################################
  // DISPLAYING USER'S TICKETS
  if (balance > 0) {
    const ticketsIDarray = [];

    // console.log(typeof balance); // -> bigint (TO BE DELETED)
    const balanceNber = Number(balance);
    // const arrLength = balanceNber - 1; // TO BE DELETED
    // console.log(arrLength); // TO BE DELETED

    for (let i = 0; i < balanceNber; i++) {
      ticketsIDarray.push(i);
    }

    // console.log(ticketsIDarray);

    return (
      <div>
        {/* <p>{account.address}</p> */}

        <p>You possess: {balance.toString()} tickets</p>

        <div className={styles.tickets_container}>
          {ticketsIDarray.map((ticketIndex) => (
            <GetTicketsId
              account={account}
              ticketIndex={ticketIndex}
              key={ticketIndex}
            />
          ))}
        </div>
      </div>
    );
  } else {
    // #########################################################################

    return <p>Please, connect your Starknet wallet</p>;
  }
};

export default function Gallery({ account }) {
  return (
    <div>
      {/* <TicketsDetails account={account} /> */}
      {account && <TicketsDetails account={account} />}
    </div>
  );
}
