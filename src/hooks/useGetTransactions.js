import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, query, onSnapshot } from "firebase/firestore"; // Import onSnapshot
import { useAuth } from "../context/AuthContext";

export const useGetTransactions = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [transactionTotal, setTransactionTotal] = useState({ balance: 0, income: 0, expense: 0 });

  useEffect(() => {
    if (!user) return; // Ensure user is available

    const q = query(collection(db, "trackers", user.uid, "expenses"));

    // Real-time listener for transactions
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const transactionsArray = [];
      let balance = 0;
      let income = 0;
      let expense = 0;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        transactionsArray.push(data);

        // Update totals based on transaction type
        if (data.transactionType === "income") {
          income += data.transactionAmount;
          balance += data.transactionAmount;
        } else {
          expense += data.transactionAmount;
          balance -= data.transactionAmount;
        }
      });

      setTransactions(transactionsArray);
      setTransactionTotal({ balance, income, expense });
    });

    // Cleanup the listener on component unmount or user change
    return () => unsubscribe();
  }, [user]); // Only run when the user changes

  return { transactions, transactionTotal };
};
