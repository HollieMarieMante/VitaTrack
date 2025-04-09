import React, { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useAuth } from "../../context/AuthContext";

const Expenses = () => {
  const [descript, setDescript] = useState("");
  const [transAmount, setTransAmount] = useState(0);
  const [transType, setTransType] = useState("expense");
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotal } = useGetTransactions();
  const { user, loading } = useAuth();

  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description: descript,
      transactionAmount: transAmount,
      transactionType: transType,
    });

    setDescript("");
    setTransAmount(0);
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="expense-tracker">
      <div className="container">
        <h2>{user?.displayName}'s Expense Tracker</h2>
        <div className="balance">
          <h3>Your balance</h3>
          {transactionTotal.balance > 0 ? (
            <h1>${transactionTotal.balance}</h1>
          ) : (
            <h1>-${Math.abs(transactionTotal.balance)}</h1>
          )}
        </div>
        <div className="summary">
          <div className="income">
            <h4>Income</h4>
            <p>${transactionTotal.income}</p>
          </div>
          <div className="expenses">
            <h4>Expenses</h4>
            <p>${transactionTotal.expense}</p>
          </div>
        </div>
        <form className="add-transaction" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Description"
            value={descript}
            required
            onChange={(e) => setDescript(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            value={transAmount}
            required
            onChange={(e) => setTransAmount(e.target.value)}
          />
          <div>
            <input
              type="radio"
              id="expense"
              value="expense"
              checked={transType === "expense"}
              onChange={(e) => setTransType(e.target.value)}
            />
            <label htmlFor="expense">Expense</label>
            <input
              type="radio"
              id="income"
              value="income"
              checked={transType === "income"}
              onChange={(e) => setTransType(e.target.value)}
            />
            <label htmlFor="income">Income</label>
          </div>
          <button type="submit">Add transaction</button>
        </form>
      </div>
      <div className="transactions">
        <h3>Transactions</h3>
        <ul>
          {transactions.map((transaction, index) => (
            <li key={index}>
              <h4>{transaction.description}</h4>
              <p>
                ${transaction.transactionAmount}
                <label
                  style={{
                    color:
                      transaction.transactionType === "expense" ? "red" : "green",
                  }}
                >
                  {transaction.transactionType}
                </label>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Expenses;
