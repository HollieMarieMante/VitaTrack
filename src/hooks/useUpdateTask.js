import { db } from "../firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export const useUpdateTask = () => {
  const { user } = useAuth();

  const updateTask = async (taskId, updateData) => {
    if (!user) return;

    try {
      const taskRef = doc(db, "trackers", user.uid, "tasks", taskId);
      await updateDoc(taskRef, updateData);
    } catch (err) {
      console.error("Error updating task: ", err);
    }
  };

  return { updateTask };
};
