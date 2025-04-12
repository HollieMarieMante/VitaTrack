import React, { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useAuth } from "../../context/AuthContext";
import { useDeleteTransaction } from "../../hooks/useDeleteTransaction";
import "../styles/Expenses.css";

const Expenses = () => {
  const [descript, setDescript] = useState("");
  const [transAmount, setTransAmount] = useState(0);
  const [transType, setTransType] = useState("expense");
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotal } = useGetTransactions();
  const { loading } = useAuth();
  const { deleteTransaction } = useDeleteTransaction();

  const handleDelete = (id) => {
    console.log("Trying to delete transaction with ID:", id);
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      deleteTransaction(id);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(transAmount);

    if (isNaN(transAmount) || transAmount <= 0) {
      alert("Please enter a valid amount greater than 0");
      return;
    }

    addTransaction({
      description: descript,
      transactionAmount: transAmount,
      type: transType,
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
        <h2>Your Expenses</h2>
        <div className="balance">
          <h3>Your balance</h3>
          {transactionTotal.balance > 0 ? (
            <h1>₱{transactionTotal.balance}</h1>
          ) : (
            <h1>-₱{Math.abs(transactionTotal.balance)}</h1>
          )}
        </div>
        <div className="summary">
          <div className="total-income">
            <h4>Income</h4>
            <p>₱{transactionTotal.income}</p>
          </div>
          <div className="expenses">
            <h4>Expenses</h4>
            <p>₱{transactionTotal.expense}</p>
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
            onChange={(e) => {
              const value = e.target.value;
              setTransAmount(value === "" ? "" : parseFloat(value));
            }}
            className="no-spinner"
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
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          {transactions.length === 0 ? (
              <p style={{ opacity: 0.6, fontStyle: "italic", padding: "1rem" }}>
                No transaction at the moment.
              </p>
            ) : (
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.description}</td>
                <td>₱ {transaction.transactionAmount}</td>
                <td>
                  <span className={transaction.transactionType === "expense" ? "expense" : "income"}>
                    {transaction.transactionType === "expense" ? (<p>Expense</p>):(<p>Income</p>)}
                  </span>
                </td>
                <td>
                    <p className="delete-word" onClick={() => handleDelete(transaction.id)}>Delete</p>
                </td>
              </tr>
            ))}
          </tbody>)}
        </table>
      </div>
    </div>
  );
};

export default Expenses;
