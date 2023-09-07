"use client";

import { useAccount } from "@starknet-react/core";
import { json } from "starknet";

import Balance from "@/components/tickets-balance/tickets-balance";

export default function Dashboard({ ...props }) {
  const { account } = useAccount();

  return (
    <div>
      <h1>Dashboard</h1>

      {account ? (
        <>
          <p>
            Tickets Balance:{" "}
            {
              <Balance
                // mintHash={txDataMint?.transaction_hash}
                account={account}
              />
            }
          </p>
        </>
      ) : (
        "Please connect your Starknet wallet"
      )}

      {/* <Balance
        account={account}
        // mintHash={txDataMint?.transaction_hash}
      /> */}
    </div>
  );
}
