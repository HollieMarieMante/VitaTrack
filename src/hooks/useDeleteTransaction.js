import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export const useDeleteTransaction = () => {
  const { user } = useAuth();

  const deleteTransaction = async (transactionId) => {
    if (!user) return;

    try {
      const transacRef = doc(db, "trackers", user.uid, "expenses", transactionId);
      await deleteDoc(transacRef);
    } catch (err) {
      console.error("Error deleting task: ", err);
    }
  };

  return { deleteTransaction };
};
