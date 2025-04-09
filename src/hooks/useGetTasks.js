import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export const useGetTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!user) return;

    const taskRef = collection(db, "trackers", user.uid, "tasks");

    const q = query(taskRef, orderBy("date", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasksArray = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        tasksArray.push({ id: doc.id, ...data });
      });

      setTasks(tasksArray);
    });

    return () => unsubscribe();
  }, [user]);

  return { tasks };
};
