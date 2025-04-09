import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export const useGetTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!user) return;

    // Reference to the tasks collection
    const taskRef = collection(db, "trackers", user.uid, "tasks");

    // Create a query to order tasks by date
    const q = query(taskRef, orderBy("date", "desc"));

    // Set up the real-time listener
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasksArray = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        tasksArray.push({ id: doc.id, ...data });
      });

      setTasks(tasksArray); // Update state with the new tasks
    });

    // Clean up the listener when the component is unmounted
    return () => unsubscribe();
  }, [user]);

  return { tasks };
};
