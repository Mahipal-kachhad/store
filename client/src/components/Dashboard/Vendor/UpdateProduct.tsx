
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  countInStock: number;
  images: string[];
}
interface Category {
  _id: string;
  name: string;
}

const UpdateProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    countInStock: "",
    images: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/products`, { withCredentials: true });
        if (res.data.success) setProducts(res.data.data);
      } catch {}
    };
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/categories`, { withCredentials: true });
        if (res.data.success) setCategories(res.data.data);
      } catch {}
    };
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    const prod = products.find((p) => p._id === selectedId);
    if (prod) {
      setForm({
        name: prod.name,
        description: prod.description || "",
        price: prod.price.toString(),
        category: prod.category,
        countInStock: prod.countInStock.toString(),
        images: prod.images.join(","),
      });
    }
  }, [selectedId, products]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedId(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedId) return toast.error("Select a product to update");
    setLoading(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        countInStock: Number(form.countInStock),
        images: form.images ? form.images.split(",") : [],
      };
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/products/${selectedId}`,
        payload,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success("Product updated successfully");
      } else {
        toast.error(res.data.error || "Failed to update product");
      }
    } catch {
      toast.error("Error updating product");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Update Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Select Product</label>
          <select
            value={selectedId}
            onChange={handleSelect}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">Select Product</option>
            {products.map((prod) => (
              <option key={prod._id} value={prod._id}>{prod.name}</option>
            ))}
          </select>
        </div>
        {selectedId && (
          <>
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
              {loading ? "Updating..." : "Update Product"}
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default UpdateProduct;
