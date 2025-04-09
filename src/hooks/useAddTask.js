import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export const useAddTask = () => {
  const { user } = useAuth();

  const addTask = async ({ title, description, deadline, priority }) => {
    if (!user) return;

    try {
      const taskRef = collection(db, "trackers", user.uid, "tasks");
      await addDoc(taskRef, {
        title,
        description,
        deadline,
        priority,
        completed: false,
        date: new Date(),
      });
    } catch (err) {
      console.error("Error adding task: ", err);
    }
  };

  return { addTask };
};
