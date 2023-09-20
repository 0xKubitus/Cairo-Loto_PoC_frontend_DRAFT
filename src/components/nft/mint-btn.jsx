"use client";

import { useEffect, useState } from "react";

import {
  useAccount,
  // useContractRead,
  useContractWrite,
  useTransactionManager,
  // useWaitForTransaction,
} from "@starknet-react/core";
import { json } from "starknet";

import Balance from "@/components/tickets-balance/tickets-balance";
import environment from "environment";

import styles from "@/styles/mint-btn.module.css";

export default function MintButton({ ...props }) {
  const { account } = useAccount();
  const { addTransaction } = useTransactionManager();
  // const bookKeeper = environment.bookKeeperAddress;

  // use useContractWrite hook to invoke both the 'approve()' from USDC contract and the 'mint()' function from TicketsHandler contract
  // (I don't why there is a "failed to fetch" error with ArgentX but the issue is most likely on their side, not in the below code)
  const { data: txDataApproveAndMint, write: writeApproveAndMint } =
    useContractWrite({
      calls: [
        {
          contractAddress: environment.usdcAddress,
          entrypoint: "approve",
          calldata: [environment.nftAddress, 10000000, 0], // (1000000000000000, 0) = 0,001 ETH -> 18 decimals, whereas USDC "only" has 6 decimals, so 10 USDC = (10000000, 0)
        },
        {
          contractAddress: environment.nftAddress,
          entrypoint: "mint",
          calldata: [],
        },
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
        <p>Your Tickets Balance:</p>
        {account ? (
          <Balance
            mintHash={txDataApproveAndMint?.transaction_hash}
            account={account}
          />
        ) : (
          "Please connect your Starknet wallet"
        )}
      </div>

      <button
        className={styles.buyBtn}
        onClick={() => writeApproveAndMint()}
        {...props}
      >
        Buy a Ticket for 10 USDC
      </button>
    </div>
  );
}

////////////////////////////////////////////////////////////////////////////////

// "use client";

// import { useEffect, useState } from "react";

// import {
//   useAccount,
//   // useContractRead,
//   useContractWrite,
//   useTransactionManager,
//   // useWaitForTransaction,
// } from "@starknet-react/core";
// import { json } from "starknet";

// import Balance from "@/components/tickets-balance/tickets-balance";
// import environment from "environment";

// import styles from "@/styles/mint-btn.module.css";

// export default function MintButton({ ...props }) {
//   const { account } = useAccount();
//   const { addTransaction } = useTransactionManager();
//   // const bookKeeper = environment.bookKeeperAddress;

//   // use useContractWrite hook to invoke the 'mint()' function from TicketsHandler contract
//   const { data: txDataMint, write: writeMint } = useContractWrite({
//     calls: [
//       {
//         contractAddress: environment.nftAddress,
//         entrypoint: "mint",
//         calldata: [],
//       },
//     ],
//   });

//   // Add transaction to the manager once transaction is submitted
//   useEffect(() => {
//     if (txDataMint) addTransaction({ hash: txDataMint.transaction_hash });
//   }, [txDataMint, addTransaction]);

//   return (
//     <div>
//       <div className={styles.userBalanceContainer}>
//         <p>Your Tickets Balance:</p>
//         {account ? (
//           <Balance mintHash={txDataMint?.transaction_hash} account={account} />
//         ) : (
//           "Please connect your Starknet wallet"
//         )}
//       </div>

//       <button className={styles.buyBtn} onClick={() => writeMint()} {...props}>
//         Buy a Ticket for 10 USDC
//       </button>
//     </div>
//   );
// }
