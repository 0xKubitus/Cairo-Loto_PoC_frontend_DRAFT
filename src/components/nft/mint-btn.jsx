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

// import ticketNft from "@/assets/abis/abi_Tickets_v0.3.2.json";
import ticketNft from "@/assets/abis/abi_TicketsHandler_v0.4.json";
import environment from "environment";

import styles from "@/styles/mint-btn.module.css";

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
      // eslint-disable-next-line
      // @ts-ignore
      setBalance(tokenBalanceData.balance.low);
    }
  }, [tokenBalanceData]);

  // Refresh the balance when the mint transaction is accepted on L2
  useEffect(() => {
    if (data && data.status === "ACCEPTED_ON_L2") refetch();
  }, [refetch, data]);

  return <p>{balance.toString()}</p>;
};

export default function MintButton({ ...props }) {
  const { account } = useAccount();
  const { addTransaction } = useTransactionManager();
  const bookKeeper = environment.bookKeeperAddress;

  //#############################################
  // AVNU WORKSHOP IMPLEMENTATION (ISSUE = ANYONE CAN MINT FOR FREE IF THEY WANT)

  // use useContractWrite hook to make a multicall: the mint function of my 'Tickets' contract && transfer some eth to the contract (multicall)
  // const { data: txDataMintAndTransfer, write: writeMintAndTransfer } =
  //   useContractWrite({
  //     calls: [
  //       {
  //         contractAddress: environment.nftAddress,
  //         entrypoint: "mint",
  //         calldata: [account?.address || "0x0"],
  //       },
  //       {
  //         contractAddress: environment.ethAddress,
  //         entrypoint: "transfer",
  //         calldata: [
  //           "0x026a65e469699ab527fbe15819c1abe4ee10cfeeec4cb3015576cbef9fc5503d", // this is one of my Braavos accounts on testnet
  //           1,
  //           0,
  //         ],
  //       },
  //     ],
  //   });
  //#############################################

  // use useContractWrite hook to make a multicall: "approve()" an ERC20 token to be spent by TicketsHandler contract && the mint function of the 'Tickets' contract
  const { data: txDataApproveAndMint, write: writeApproveAndMint } =
    useContractWrite({
      calls: [
        {
          contractAddress: environment.ethAddress,
          entrypoint: "approve",
          calldata: [
            "0x04b6c0d179D7B8fb369afa4aD3d8D8E75a031E621319ca93326b27CbEa82Fd46",
            1000000000000000,
            0,
          ], // 0x04b6c0d179D7B8fb369afa4aD3d8D8E75a031E621319ca93326b27CbEa82Fd46 is my ArgentX testnet account and is used as the bookkeeper address for now as the Tickets contract current version v0.4 uses the ticketsHandler contract's owner as the BookKeeper account/address (and "1000000000000000, 0" is the current price of the ticket = 0,001 ETH)
        },
        // {
        //   contractAddress: environment.nftAddress,
        //   entrypoint: "mint",
        //   calldata: [],
        //   // calldata: [account?.address || "0x0"], // no calldata needed in mint() fn from latest TicketsHandler contract
        // },
      ],
    });

  // Add transaction to the manager once transaction is submitted
  useEffect(() => {
    if (txDataApproveAndMint)
      addTransaction({ hash: txDataApproveAndMint.transaction_hash });
  }, [txDataApproveAndMint, addTransaction]);

  return (
    <div>
      <div className={styles.userBalanceContainer}>
        <p>Tickets Balance:</p>
        {account ? (
          <Balance
            mintHash={txDataApproveAndMint?.transaction_hash}
            account={account}
          />
        ) : (
          "0"
        )}
      </div>

      <button
        className={styles.buyBtn}
        onClick={() => writeApproveAndMint()}
        {...props}
      >
        Buy a Ticket for 0.001 ETH
      </button>
    </div>
  );
}
