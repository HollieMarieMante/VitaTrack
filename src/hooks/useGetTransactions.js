import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, query, onSnapshot } from "firebase/firestore"; // Import onSnapshot
import { useAuth } from "../context/AuthContext";

export const useGetTransactions = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [transactionTotal, setTransactionTotal] = useState({ balance: 0, income: 0, expense: 0 });

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "trackers", user.uid, "expenses"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const transactionsArray = [];
      let balance = 0;
      let income = 0;
      let expense = 0;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        transactionsArray.push(data);

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

    return () => unsubscribe();
  }, [user]);
  
  return { transactions, transactionTotal };
};
