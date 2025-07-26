import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, UserCog } from "lucide-react";
import * as z from "zod/v4";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const RegisterSchema = z
  .object({
    firstName: z.string().min(1, "first name is required"),
    lastName: z.string().optional(),
    email: z.email(),
    password: z
      .string()
      .min(8, "at least 8 charactors")
      .max(16, "less than 16 charactors"),
    rePassword: z
      .string()
      .min(8, "at least 8 charactors")
      .max(16, "less than 16 charactors"),
    role: z.string(),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "password do not match",
    path: ["rePassword"],
  });
type TRegisterSchema = z.infer<typeof RegisterSchema>;

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TRegisterSchema>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (data: TRegisterSchema) => {
    console.log(data);
    const { firstName, lastName, email, password, role } = data;
    try {
      const responce = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/register`,
        {
          firstName,
          lastName,
          email,
          password,
          role,
        }
      );
      if (responce.data.success) {
        toast.success("registered successfully");
        navigate("/login");
      } else toast.error("error submitting data");
    } catch (error) {
      console.log(error);
      toast.error("internal server error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Create an account
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
              <input
                placeholder="John"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="text-red-700 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Doe"
                {...register("lastName")}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.lastName && (
                <p className="text-red-700 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-700 text-sm">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("password")}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-700 text-sm">{errors.password.message}</p>
            )}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Re-enter Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
            <input
              type={showRePassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("rePassword")}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.rePassword && (
              <p className="text-red-700 text-sm">
                {errors.rePassword.message}
              </p>
            )}
            <button
              type="button"
              onClick={() => setShowRePassword(!showRePassword)}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              tabIndex={-1}
            >
              {showRePassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <div className="relative">
            <UserCog className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
            <select
              {...register("role")}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="user">User</option>
              <option value="vendor">Vendor</option>
            </select>
            {errors.role && (
              <p className="text-red-700 text-sm">{errors.role.message}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-150 ${
            isSubmitting && "opacity-50 cursor-not-allowed"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Register"}
        </button>

        <div className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="text-blue-600 hover:underline font-medium"
          >
            Go to Login
          </Link>
        </div>
      </form>
    </div>
  );
}
