import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export const useDeleteTask = () => {
  const { user } = useAuth();

  const deleteTask = async (taskId) => {
    if (!user) return;

    try {
      const taskRef = doc(db, "trackers", user.uid, "tasks", taskId);
      await deleteDoc(taskRef);
    } catch (err) {
      console.error("Error deleting task: ", err);
    }
  };

  return { deleteTask };
};
