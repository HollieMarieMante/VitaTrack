import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const snap = await getDocs(collection(db, "users"));
    const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setUsers(data);
  };

  const toggleBlock = async (id, isBlocked) => {
    await updateDoc(doc(db, "users", id), { isBlocked: !isBlocked });
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await deleteDoc(doc(db, "users", id));
    fetchUsers();
  };

  useEffect(() => { fetchUsers(); }, []);

  return (
    <div>
      <h2>User Management</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.isBlocked ? "Blocked" : "Active"}</td>
              <td>
                <button onClick={() => toggleBlock(u.id, u.isBlocked)}>
                  {u.isBlocked ? "Unblock" : "Block"}
                </button>
                <button onClick={() => deleteUser(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;