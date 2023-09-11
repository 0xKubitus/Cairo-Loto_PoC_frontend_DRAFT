"use client";

import { useState, useEffect } from "react";

import { useContractRead, useWaitForTransaction } from "@starknet-react/core";
import { json } from "starknet";

import ticketNft from "@/assets/abis/abi_TicketsHandler_v0.4.json"; // (make sure to import the latest TicketsHandler version's abi)
import environment from "environment";

// Compiled ABI for my 'Tickets' contract
const compiledTicketNft = json.parse(JSON.stringify(ticketNft));

const GetTicketsId = ({ account, ticketIndex }) => {
  // Internal state representing the current ticketId
  const [ticketId, setTicketId] = useState(0);

  // Turn 'ticketIndex' into a JS object in the bigint format, for example: '{ high: 0, low: 1 }'
  const ticketIndexObject = { high: 0, low: ticketIndex };
  // console.log("ticketIndexObject = ", ticketIndexObject);

  // TODO: and use this new variable/const as arg/param in the call to 'tokenOfOwnerByIndex()'

  //################################
  // use useContractRead hook to fetch the tokenId of the ticket (by index)
  const { data: tokenOfOwnerByIndexData, refetch } = useContractRead({
    address: environment.nftAddress,
    abi: compiledTicketNft,
    functionName: "tokenOfOwnerByIndex",
    args: [
      account.address,
      ticketIndexObject,
      // { high: 0, low: 1 }, // NOTE THAT "low: 1" REFERS TO THE SECOND TOKEN BY INDEX, NOT THE FIRST ONE! (use "low: 1" for the first one)
    ],
  });

  // Set the internal state ticketId when the tokenOfOwnerByIndexData is fetched
  useEffect(() => {
    if (tokenOfOwnerByIndexData) {
      console.log(
        "Number(tokenOfOwnerByIndexData.tokenId.low) = ",
        Number(tokenOfOwnerByIndexData.tokenId.low)
      );
      setTicketId(Number(tokenOfOwnerByIndexData.tokenId.low));
    }
  }, [tokenOfOwnerByIndexData]);

  //################################

  return (
    <div className="getTicketIdMainDiv">
      {/* <p>{account.address}</p> */}

      {ticketIndex >= 0 && <div>tokenIndex = {ticketIndex}</div>}

      {/* //################################ */}
      {tokenOfOwnerByIndexData && <p>ticket ID = {ticketId}</p>}
      {/* //################################ */}

      {/* {data && <div>ticket # = {data}</div>} */}
    </div>
  );
};

export default GetTicketsId;
