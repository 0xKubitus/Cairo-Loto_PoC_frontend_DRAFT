"use client";

import { useState, useEffect } from "react";

import { useContractRead, useWaitForTransaction } from "@starknet-react/core";
import { json } from "starknet";

import ticketNft from "@/assets/abis/abi_TicketsHandler_v0.4.json"; // make sure to import the latest TicketsHandler version's abi
import environment from "environment";

// Compiled ABI for my 'Tickets' contract
const compiledTicketNft = json.parse(JSON.stringify(ticketNft));

const GetTicketsId = ({ account, ticketIndex }) => {
  // Internal state representing the current ticketId
  const [ticketId, setTicketId] = useState(0);

  // use useContractRead hook to fetch the tokenId of the ticket (by index)
  const { data: tokenOfOwnerByIndexData, refetch } = useContractRead({
    address: environment.nftAddress,
    abi: compiledTicketNft,
    functionName: "tokenOfOwnerByIndex",
    // args: [account.address, ticketIndex], // error -> "Validate: arg index is cairo type struct (Uint256), and should be defined as js object (not array)"
    // args: [account.address, { 1: 0 }], // error -> "Validate: arg index should have a property low"
    // args: [account.address, { high: 1, low: 0 }], // error -> "pv: Error message: ERC721Enumerable: owner index out of bounds
    // Error at pc=0:1394:
    // An ASSERT_EQ instruction failed: 0 != 1."
    args: [
      account.address,
      { high: 0, low: 1 }, // NOTE THAT "low: 1" REFERS TO THE SECOND TOKEN BY INDEX, NOT THE FIRST ONE! (use "low: 1" for the first one)
    ],
  });

  // Set the internal state ticketId when the tokenOfOwnerByIndexData is fetched
  useEffect(() => {
    if (tokenOfOwnerByIndexData) {
      // console.log("tokenOfOwnerByIndexData = ", tokenOfOwnerByIndexData);
      setTicketId(tokenOfOwnerByIndexData.tokenId.low);
    }
  }, [tokenOfOwnerByIndexData]);

  // console.log(account);
  // console.log(typeof account.address);
  // console.log(data);
  // console.log(typeof ticketIndex);
  // console.log("tokenOfOwnerByIndexData", tokenOfOwnerByIndexData);

  console.log(tokenOfOwnerByIndexData);

  return (
    <>
      {/* <p>{account.address}</p> */}

      {ticketIndex >= 0 && <div>tokenIndex = {ticketIndex}</div>}

      {/* {data && <div>ticket # = {data}</div>} */}
      {tokenOfOwnerByIndexData && <p>ticket ID = {ticketId}</p>}
    </>
  );
};

export default GetTicketsId;
