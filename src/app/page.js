import Image from "next/image";

import MintButton from "@/components/nft/mint-btn";

import styles from "@/styles/page.module.css";

export default function Home() {
  return (
    <div className={styles.mainContainer}>
      <h2>On-chain Lottery dApp on Starknet</h2>
      <h4>(Proof of Concept - Deployed on Goerli Testnet)</h4>

      <div>
        {/* <button>MORE INFO</button> */}
        <MintButton />
      </div>
    </div>
  );
}
