import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export const useGetTransactions = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [transactionTotal, setTransactionTotal] = useState({ balance: 0, income: 0, expense: 0 });
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const transactionRef = collection(db, "trackers", user.uid, "expenses");
    const q = query(transactionRef, orderBy("date", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const transactionsArray = [];
      let balance = 0;
      let income = 0;
      let expense = 0;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const transaction = { id: doc.id, ...data };
        transactionsArray.push(transaction);

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
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  return { transactions, transactionTotal, isLoading };
};
