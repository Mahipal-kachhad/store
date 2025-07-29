
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

const UpdateUser = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "user",
    password: "",
  });
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

  useEffect(() => {
    if (!selectedId) return;
    const user = users.find((u) => u._id === selectedId);
    if (user) {
      setForm({
        firstName: user.firstName,
        lastName: user.lastName || "",
        email: user.email,
        role: user.role,
        password: "",
      });
    }
  }, [selectedId, users]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedId(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedId) return toast.error("Select a user to update");
    setLoading(true);
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/admin/${selectedId}`,
        form,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success("User updated successfully");
      } else {
        toast.error(res.data.error || "Failed to update user");
      }
    } catch {
      toast.error("Error updating user");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Update User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
        {selectedId && (
          <>
            <div>
              <label className="block mb-1 font-medium">First Name</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Role</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="vendor">Vendor</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Password (set new)</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update User"}
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default UpdateUser;
