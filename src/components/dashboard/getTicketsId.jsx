"use client";

// import { useState, useEffect } from "react";

import { useContractRead, useWaitForTransaction } from "@starknet-react/core";
import { json } from "starknet";

import ticketNft from "@/assets/abis/abi_TicketsHandler_v0.4.json"; // make sure to import the latest TicketsHandler version's abi
import environment from "environment";

// Compiled ABI for my 'Tickets' contract
const compiledTicketNft = json.parse(JSON.stringify(ticketNft));

const GetTicketsId = ({ ticketID }) => {
  return ticketID >= 0 && <div>tokenIndex = {ticketID}</div>;
};

export default GetTicketsId;
