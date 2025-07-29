
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface User {
  _id: string;
  firstName: string;
  lastName?: string;
  email: string;
}

const DeleteUser = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/admin`, { withCredentials: true });
        if (res.data.success) setUsers(res.data.data);
      } catch {}
    };
    fetchUsers();
  }, []);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedId(e.target.value);
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedId) return toast.error("Select a user to delete");
    setLoading(true);
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/admin/${selectedId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success("User deleted successfully");
        setUsers(users.filter((u) => u._id !== selectedId));
        setSelectedId("");
      } else {
        toast.error(res.data.error || "Failed to delete user");
      }
    } catch {
      toast.error("Error deleting user");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Delete User</h2>
      <form onSubmit={handleDelete} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Select User</label>
          <select
            value={selectedId}
            onChange={handleSelect}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>{user.firstName} {user.lastName}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete User"}
        </button>
      </form>
    </div>
  );
};

export default DeleteUser;
