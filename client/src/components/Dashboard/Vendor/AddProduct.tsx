

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface Category {
  _id: string;
  name: string;
}

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    inStock: true,
    countInStock: 0,
    images: "",
  });
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/categories`, { withCredentials: true });
        if (res.data.success) {
          setCategories(res.data.data);
        }
      } catch{
        toast.error("Failed to fetch categories");
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        countInStock: Number(form.countInStock),
        images: form.images ? form.images.split(",") : [],
      };
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/products`,
        payload,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success("Product added successfully");
        setForm({
          name: "",
          description: "",
          price: "",
          category: "",
          inStock: true,
          countInStock: 0,
          images: "",
        });
      } else {
        toast.error(res.data.error || "Failed to add product");
      }
    } catch {
      toast.error("Error adding product");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>
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
        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
            min="0"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Count In Stock</label>
          <input
            type="number"
            name="countInStock"
            value={form.countInStock}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
            min="0"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Images (comma separated URLs)</label>
          <input
            type="text"
            name="images"
            value={form.images}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
