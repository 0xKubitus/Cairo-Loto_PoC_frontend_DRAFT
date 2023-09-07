"use client";

import { useEffect, useState } from "react";

import {
  useAccount,
  useContractRead,
  useWaitForTransaction,
} from "@starknet-react/core";
import { json } from "starknet";

import environment from "environment";
import ticketNft from "@/assets/abis/abi_TicketsHandler_v0.4.json"; // make sure to import the latest TicketsHandler version's abi
// import Gallery from "@/components/nft/gallery";

export default function Dashboard() {
  const { account } = useAccount();

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
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {account ? (
        <>
          <p>
            Tickets Balance:
            {
              <Balance
                // burnHash={txDataBurn?.transaction_hash}
                account={account}
              />
            }
          </p>
        </>
      ) : (
        "Please connect your Starknet wallet"
      )}
      <h2>TICKETS IN YOUR POSSESSION</h2>
      {/* <Gallery /> */}
      {/* balance={balance} */}
    </div>
  );
}
