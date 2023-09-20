"use client";

import { useState, useEffect } from "react";

import { useContractRead, useWaitForTransaction } from "@starknet-react/core";
import { json } from "starknet";

import ticketNft from "@/assets/abis/abi_TicketsHandler_v0.4.3.json"; // (make sure to import the latest TicketsHandler version's abi)
import environment from "environment";

import styles from "@/styles/getTicketsId.module.css";
import BurnButton from "./burn-btn";

// Compiled ABI for my 'Tickets' contract
const compiledTicketNft = json.parse(JSON.stringify(ticketNft));

const GetTicketsId = ({ account, ticketIndex }) => {
  // Internal state representing the current ticketId
  const [ticketId, setTicketId] = useState(0);
  const [ticketObject, setTicketObject] = useState({});

  // Turn 'ticketIndex' into a JS object in the bigint format, for example: '{ high: 0, low: 1 }'
  const ticketIndexObject = { high: 0, low: ticketIndex };
  // console.log("ticketIndexObject = ", ticketIndexObject);

  //################################
  // use useContractRead hook to fetch the tokenId of the ticket (by index)
  const { data: tokenOfOwnerByIndexData, refetch } = useContractRead({
    address: environment.nftAddress,
    abi: compiledTicketNft,
    functionName: "tokenOfOwnerByIndex",
    args: [account.address, ticketIndexObject],
  });

  // Set the internal state ticketId when the tokenOfOwnerByIndexData is fetched
  useEffect(() => {
    if (tokenOfOwnerByIndexData) {
      // console.log(
      //   "Number(tokenOfOwnerByIndexData.tokenId.low) = ",
      //   Number(tokenOfOwnerByIndexData.tokenId.low)
      // );
      setTicketId(Number(tokenOfOwnerByIndexData.tokenId.low));

      let ticketIdConvertedToNum = {
        high: Number(tokenOfOwnerByIndexData.tokenId.high),
        low: Number(tokenOfOwnerByIndexData.tokenId.low),
      };
      setTicketObject(ticketIdConvertedToNum);
      console.log(ticketIdConvertedToNum);
    }
  }, [tokenOfOwnerByIndexData]);

  // console.log(
  //   "tokenOfOwnerByIndexData.tokenId = ",
  //   tokenOfOwnerByIndexData.tokenId
  // );

  //################################

  return (
    <div className={styles.ticket_display}>
      {ticketIndex >= 0 && <p>tokenIndex = {ticketIndex}</p>}

      {tokenOfOwnerByIndexData && <p>ticket ID = {ticketId}</p>}

      <BurnButton token_id={ticketObject} />
    </div>
  );
};

export default GetTicketsId;
