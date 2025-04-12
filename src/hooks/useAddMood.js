import { db } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export const useAddMood = () => {
  const { user } = useAuth();

  const addMood = async (date, moodData) => {
    if (!user) return;

    try {
      const moodRef = doc(db, "trackers", user.uid, "moods", date);
      await setDoc(moodRef, moodData);
    } catch (error) {
      console.error("Error adding mood:", error);
    }
  };

  return { addMood };
};
