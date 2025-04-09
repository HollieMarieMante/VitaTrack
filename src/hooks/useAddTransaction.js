import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export const useAddTransaction = () => {
  const { user } = useAuth();

  const addTransaction = async ({ description, transactionAmount, type }) => {
    if (!user) return;

    try {
      const transactionRef = collection(db, "trackers", user.uid, "expenses");
      await addDoc(transactionRef, {
        description,
        amount: parseFloat(transactionAmount),
        type,
        date: new Date(),
      });
    } catch (err) {
      console.error("Error adding transaction: ", err);
    }
  };

  return { addTransaction };
};
