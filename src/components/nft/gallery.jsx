"use client";

import { useContractRead } from "@starknet-react/core";
import { json } from "starknet";

import ticketNft from "@/assets/abis/abi_TicketsHandler_v0.4.json"; // make sure to import the latest TicketsHandler version's abi
import environment from "environment";

// Compiled ABI for my 'Tickets' contract
const compiledTicketNft = json.parse(JSON.stringify(ticketNft));

export default function Gallery({ balance, address }) {
  const ownedTickets = [];

  // console.log(typeof balance); // to be deleted

  return (
    <div>
      <p>Gallery</p>
      <p>balance = {balance.toString()}</p>
    </div>
  );
}
