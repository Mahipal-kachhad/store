

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface User {
  _id: string;
  firstName: string;
  lastName?: string;
  email: string;
  role: string;
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/users`, { withCredentials: true });
        if (res.data.success) {
          setUsers(res.data.data);
        } else {
          toast.error(res.data.error || "Failed to fetch users");
        }
      } catch {
        toast.error("Error fetching users");
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">User List</h2>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">First Name</th>
              <th className="p-2 border">Last Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="p-2 border">{user.firstName}</td>
                <td className="p-2 border">{user.lastName}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
