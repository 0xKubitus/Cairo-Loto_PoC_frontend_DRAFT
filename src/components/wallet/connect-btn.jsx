"use client";

import { useState, useMemo } from "react";

import { useAccount, useConnectors } from "@starknet-react/core";
import ConnectWalletModal from "./connect-wallet-modal";

import styles from "@/styles/connect-btn.module.css";

import { cropAddress } from "@/services/address.service";

const ConnectButton = ({ children, ...props }) => {
  const { status, address } = useAccount();
  const { disconnect } = useConnectors();
  const [isConnectModalOpen, setConnectModalOpen] = useState(false);

  const handleClickConnect = () => {
    setConnectModalOpen(true);
  };

  const isConnected = useMemo(
    () => status === "connected" && !!address,
    [status, address]
  );

  return (
    <>
      <button
        className={styles.connectBtn}
        onClick={isConnected ? disconnect : handleClickConnect}
        {...props}
      >
        {isConnected
          ? cropAddress(address || "")
          : children || "Connect Wallet"}
      </button>
      <ConnectWalletModal
        isOpen={isConnectModalOpen}
        onClose={() => setConnectModalOpen(false)}
      />
    </>
  );
};

export default ConnectButton;
