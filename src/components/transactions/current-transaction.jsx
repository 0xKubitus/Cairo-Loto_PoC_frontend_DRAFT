// "use client";

import {
  useTransactionManager,
  useWaitForTransaction,
} from "@starknet-react/core";
import { useMemo } from "react";

export default function CurrentTransaction() {
  const { hashes } = useTransactionManager();
  const lastHash = useMemo(() => {
    return hashes[hashes.length - 1];
  }, [hashes]);
  const { data, isLoading } = useWaitForTransaction({
    hash: lastHash,
    watch: true,
  });
  return (
    <div direction="column">
      <p>Last transaction status</p>
      {!isLoading && data && (hashes.length === 0 ? "-" : data?.status)}
    </div>
  );
}
