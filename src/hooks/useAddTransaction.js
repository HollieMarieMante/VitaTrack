import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export const useAddTransaction = () => {
  const { user } = useAuth();

  const addTransaction = async ({ description, transactionAmount, transactionType }) => {
    if (!user) return;

    try {
      // Add transaction to Firestore (expenses subcollection)
      const transactionRef = collection(db, "trackers", user.uid, "expenses");
      await addDoc(transactionRef, {
        description,
        transactionAmount: parseFloat(transactionAmount),
        transactionType,
        date: new Date(),
      });
    } catch (err) {
      console.error("Error adding transaction: ", err);
    }
  };

  return { addTransaction };
};
