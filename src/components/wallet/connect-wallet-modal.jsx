import { useEffect } from "react";
import Link from "next/link";
import { useConnectors } from "@starknet-react/core";

import BoxItem from "@/components/modal/box-item";
import Modal from "@/components/modal/modal";

const ConnectWalletModal = ({ isOpen, onClose }) => {
  const { available, connect, refresh } = useConnectors();
  useEffect(() => {
    let interval;
    if (available.length === 0) {
      interval = setInterval(refresh, 0);
    }
    return () => clearInterval(interval);
  }, [available, refresh]);
  const handleClickConnect = (connector) => () => {
    connect(connector);
    onClose();
  };

  return (
    <Modal title="Connect wallet" isOpen={isOpen} onClose={onClose}>
      {available.length > 0 ? (
        <div>
          {available.map((connector) => (
            <BoxItem
              key={`connector-${connector.id}`}
              onClick={handleClickConnect(connector)}
            >
              {connector.name}
            </BoxItem>
          ))}
        </div>
      ) : (
        <Link href="https://www.starknet-ecosystem.com/en/academy">
          <BoxItem>No wallet detected, you can download one here</BoxItem>
        </Link>
      )}
    </Modal>
  );
};

export default ConnectWalletModal;
