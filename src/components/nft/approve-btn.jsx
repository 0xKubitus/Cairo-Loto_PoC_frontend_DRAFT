// "permission" needs to be replaced by "allowance" throughout this file!

"use client";

import { useEffect, useState } from "react";

import {
  useAccount,
  useContractRead,
  useContractWrite,
  useTransactionManager,
  useWaitForTransaction,
} from "@starknet-react/core";
import { json } from "starknet";

import ERC20abi from "@/assets/abis/abi_dummy_token.json";
// import ticketNft from "@/assets/abis/abi_Tickets_v0.3.2.json";
import ticketNft from "@/assets/abis/abi_TicketsHandler_v0.4.json";
import environment from "environment";

import styles from "@/styles/mint-btn.module.css";

// Compiled ABI for my 'Tickets' contract
const compiledTicketNft = json.parse(JSON.stringify(ticketNft));

// Fetching permission of an account
const Permission = ({ account, approveHash }) => {
  // Internal state representing the current permission of the account
  const [permission, setPermission] = useState(0);

  // use useWaitForTransaction hook to wait for the approve transaction to be accepted on L2 -> Use to refresh the permission after approve
  const { data } = useWaitForTransaction({ hash: approveHash, watch: true });

  // use useContractRead hook to fetch the permission of the account
  const { data: tokenPermissionData, refetch } = useContractRead({
    address: environment.ethAddress,
    abi: ERC20abi,
    functionName: "allowance",
    args: [account.address, environment.nftAddress],
  });

  // Set the internal state permission when the tokenPermissionData is fetched
  useEffect(() => {
    if (tokenPermissionData) {
      // console.log(tokenPermissionData); // SHOULD BE A COMMENT/DELETED
      setPermission(tokenPermissionData.remaining.low);
    }
  }, [tokenPermissionData]);

  // Refresh the permission when the approve transaction is accepted on L2
  useEffect(() => {
    if (data && data.status === "ACCEPTED_ON_L2") refetch();
  }, [refetch, data]);

  return (
    <div>
      {permission <= 0 ? (
        <p>
          REFUSED: Approval to spend ETH is mandatory - min qty needed:
          1000000000000000 (0.001 ETH)
        </p>
      ) : (
        <p>
          {permission.toString()} - min qty needed: 1000000000000000 (0.001 ETH)
        </p>
      )}
    </div>
  );
  // return <p>{permission.toString()}</p>;
};

export default function ApproveButton({ ...props }) {
  const { account } = useAccount();
  const { addTransaction } = useTransactionManager();
  // const bookKeeper = environment.bookKeeperAddress;

  // use useContractWrite hook to invoke "approve(ticket_price)" on an ERC20 token to be spent by TicketsHandler contract
  const { data: txApproveData, write: writeApprove } = useContractWrite({
    calls: [
      {
        contractAddress: environment.ethAddress,
        entrypoint: "approve",
        calldata: [
          environment.nftAddress,
          // "0x025654448400d6078a4b9e09f6e90816bc63325996232aa1a69661c267354cab", // TicketsHandler contract address (it seems I'm obliged to use the contract address where the approve() function that includes the transferFrom() is because transferFrom uses "_spend_allowance()" that requires the recipient of the transfer to be the caller)
          1000000000000000,
          0,
        ], // ("1000000000000000, 0" is the current price of the ticket = 0,001 ETH)
      },
    ],
  });

  // Add transaction to the manager once transaction is submitted
  useEffect(() => {
    if (txApproveData) addTransaction({ hash: txApproveData.transaction_hash });
  }, [txApproveData, addTransaction]);

  return (
    <div>
      <div className={styles.userPermissionContainer}>
        <p>Permission to mint Ticket:</p>
        {account ? (
          <Permission
            approveHash={txApproveData?.transaction_hash}
            account={account}
          />
        ) : (
          "You need to connect a Starknet wallet first"
        )}
      </div>

      <button
        className={styles.buyBtn}
        onClick={() => writeApprove()}
        {...props}
      >
        APPROVE TX
      </button>
    </div>
  );
}
