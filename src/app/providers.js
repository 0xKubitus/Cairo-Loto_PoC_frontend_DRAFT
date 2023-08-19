"use client";

import { StarknetConfig, InjectedConnector } from "@starknet-react/core";
import { constants, Provider } from "starknet";

export function Providers({ children }) {
  const connectors = [
    new InjectedConnector({ options: { id: "braavos" } }),
    new InjectedConnector({ options: { id: "argentX" } }),
  ];
  return (
    <StarknetConfig
      defaultProvider={
        new Provider({
          sequencer: { network: constants.NetworkName.SN_GOERLI },
        })
      }
      autoConnect
      connectors={connectors}
    >
      {children}
    </StarknetConfig>
  );
}
