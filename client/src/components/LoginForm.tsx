import { useState, type ChangeEvent, type FormEvent } from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import axios, { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import type { ApiErrorResponse } from "../types/interfaces";
import toast from "react-hot-toast";

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const responce = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      if (responce.data.success === true) {
        navigate("/");
      }
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;
      if (axios.isAxiosError<ApiErrorResponse>(error) && error.response)
        toast.error(error.response.data.error);
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            Login
          </h2>

          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <div className="flex items-center bg-gray-100 border border-gray-300 rounded-lg px-3 py-2">
              <User className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="email"
                placeholder="you@example.com"
                name="email"
                className="w-full bg-transparent outline-none text-gray-800"
                value={data.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <div className="flex items-center bg-gray-100 border border-gray-300 rounded-lg px-3 py-2">
              <Lock className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                name="password"
                className="w-full bg-transparent outline-none text-gray-800 pr-8"
                value={data.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="text-right mb-6">
            <Link
              to={"/forget-password"}
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-150"
          >
            Login
          </button>

          <div className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link
              to={"/register"}
              className="text-blue-600 hover:underline font-medium"
            >
              Go to Register
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
