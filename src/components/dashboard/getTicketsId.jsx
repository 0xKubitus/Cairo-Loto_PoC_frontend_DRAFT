"use client";

// import { useState, useEffect } from "react";

import { useContractRead, useWaitForTransaction } from "@starknet-react/core";
import { json } from "starknet";

import ticketNft from "@/assets/abis/abi_TicketsHandler_v0.4.json"; // make sure to import the latest TicketsHandler version's abi
import environment from "environment";

// Compiled ABI for my 'Tickets' contract
const compiledTicketNft = json.parse(JSON.stringify(ticketNft));

const GetTicketsId = ({ balance }) => {
  // const ticketsIDarray = [];

  // // console.log(typeof balance); // -> bigint (TO BE DELETED)

  // const balanceNber = Number(balance);
  // const arrLength = balanceNber - 1;
  // // console.log(arrLength); // TO BE DELETED

  // for (let i = 0; i < arrLength; i++) {
  //   // use useContractRead hook to fetch the balance of the account
  //   const { data: tokenBalanceData, refetch } = useContractRead({
  //     address: environment.nftAddress,
  //     abi: compiledTicketNft,
  //     functionName: "balanceOf",
  //     args: [account.address],
  //   });
  // }
  return <div>GetTicketsId</div>;
};

export default GetTicketsId;
