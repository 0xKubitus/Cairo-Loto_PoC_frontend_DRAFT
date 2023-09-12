"use client";

import { useAccount } from "@starknet-react/core";

import Gallery from "@/components/nft/gallery";

export default function Dashboard() {
  const account = useAccount();

  return (
    <div>
      <h1>Dashboard</h1>
      <Gallery account={account} />
    </div>
  );
}
