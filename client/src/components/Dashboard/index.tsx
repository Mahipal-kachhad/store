import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import AddCategory from "./Vendor/AddCategory";
import AddProduct from "./Vendor/AddProduct";
import UpdateProduct from "./Vendor/UpdateProduct";
import UserList from "./Admin/UserList";
import UpdateUser from "./Admin/UpdateUser";
import DeleteUser from "./Admin/DeleteUser";
import { useEffect, useState } from "react";
import axios from "axios";
import type { ApiErrorResponse } from "../../types/interfaces";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    role: "",
    firstName: "",
    lastName: "",
    cart: [],
    orders: [],
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const responce = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/auth/me`,
          { withCredentials: true }
        );
        if (!responce.data.success) {
          toast.error("please Login");
          navigate("/login");
        } else {
          setUser(responce.data.data);
          setLoading(false);
          if (responce.data.data.role === "user") {
            toast.error("You are not allowed to access dashboard");
            navigate("/");
          }
        }
      } catch (err) {
        const error = err as ApiErrorResponse;
        console.log(error);
      }
    };
    getUser();
  }, [navigate]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar role={user.role} loading={loading} />
      <main className="flex-1 bg-gray-100 p-4">
        <Routes>
          {(user.role === "vendor" || user.role === "admin") && (
            <>
              <Route path="/vendor/add-category" element={<AddCategory />} />
              <Route path="/vendor/add-product" element={<AddProduct />} />
              <Route
                path="/vendor/update-product"
                element={<UpdateProduct />}
              />
            </>
          )}
          {user.role === "admin" && (
            <>
              <Route path="/admin/user-list" element={<UserList />} />
              <Route path="/admin/update-user" element={<UpdateUser />} />
              <Route path="/admin/delete-user" element={<DeleteUser />} />
            </>
          )}
          <Route
            path="*"
            element={
              <div className="text-center text-xl text-gray-500">
                Select an option from the sidebar.
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
