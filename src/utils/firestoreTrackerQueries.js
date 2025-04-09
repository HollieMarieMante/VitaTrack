import { db } from "../firebase/config";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

export const addTrackerEntry = async (uid, trackerType, data) => {
  await addDoc(collection(db, "users", uid, trackerType), data);
};

export const getTrackerEntries = async (uid, trackerType) => {
  const snap = await getDocs(collection(db, "users", uid, trackerType));
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const deleteTrackerEntry = async (uid, trackerType, entryId) => {
  await deleteDoc(doc(db, "users", uid, trackerType, entryId));
};

export const updateTrackerEntry = async (uid, trackerType, entryId, newData) => {
  await updateDoc(doc(db, "users", uid, trackerType, entryId), newData);
};
