import { useTransactionManager } from "@starknet-react/core";

function Transaction({ tx }) {
  return <div>{tx.hash}</div>;
}
export default function TransactionsList() {
  const { transactions } = useTransactionManager();
  return (
    <div>
      <p>All transactions</p>
      {transactions.map((transaction) => {
        return <Transaction tx={transaction} key={transaction.hash} />;
      })}
    </div>
  );
}
