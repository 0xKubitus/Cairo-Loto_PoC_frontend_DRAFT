"use client";

import { useState, useEffect } from "react";

import { useContractRead, useWaitForTransaction } from "@starknet-react/core";
import { json } from "starknet";

import ticketNft from "@/assets/abis/abi_TicketsHandler_v0.4.json"; // make sure to import the latest TicketsHandler version's abi
import environment from "environment";

// Compiled ABI for my 'Tickets' contract
const compiledTicketNft = json.parse(JSON.stringify(ticketNft));

const GetTicketsId = ({ account, ticketIndex }) => {
  // Internal state representing the current balance of the ticketId
  const [ticketId, setTicketId] = useState(0);

  // use useContractRead hook to fetch the tokenId of the token (by index)
  const { data: tokenOfOwnerByIndexData, refetch } = useContractRead({
    address: environment.nftAddress,
    abi: compiledTicketNft,
    functionName: "tokenOfOwnerByIndex",
    args: [account.address, ticketIndex],
  });

  // Set the internal state ticketId when the tokenOfOwnerByIndexData is fetched
  useEffect(() => {
    if (tokenOfOwnerByIndexData) {
      console.log("tokenOfOwnerByIndexData = ", tokenOfOwnerByIndexData);
      setTicketId(tokenOfOwnerByIndexData.tokenId.low);
    }
  }, [tokenOfOwnerByIndexData]);

  // console.log(account);
  // console.log(data);

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
