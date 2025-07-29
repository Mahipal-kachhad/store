import { useState } from "react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import type { ApiErrorResponse } from "../../../types/interfaces";

const AddCategory = () => {
  const [form, setForm] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Array<{_id:string, name:string, description?:string}>>([]);
  const [catLoading, setCatLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/categories/`,
        form,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success("Category added successfully");
        setForm({ name: "", description: "" });
      } else {
        toast.error(res.data.error || "Failed to add category");
      }
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;
      toast.error(error.response?.data?.error || "Error adding category");
    }
    setLoading(false);
  };

  const fetchCategories = async () => {
    setCatLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/categories/`, { withCredentials: true });
      if (res.data.success) {
        setCategories(res.data.data);
      } else {
        toast.error(res.data.error || "Failed to fetch categories");
      }
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;
      toast.error(error.response?.data?.error || "Error fetching categories");
    }
    setCatLoading(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add Category</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Category"}
        </button>
      </form>
      <button
        onClick={fetchCategories}
        className="mt-6 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 w-full"
        disabled={catLoading}
      >
        {catLoading ? "Loading..." : "Show All Categories"}
      </button>
      {categories.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">All Categories</h3>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat._id} className="border p-2 rounded">
                <span className="font-bold">{cat.name}</span>
                {cat.description && <span className="ml-2 text-gray-600">- {cat.description}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddCategory;
