import { useState } from "react";
import { Mail, Lock, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EmailSchema = z.object({
  email: z.email("Enter a valid email"),
});

const OtpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

const PasswordResetSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Minimum 8 characters")
      .max(16, "Maximum 16 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"email" | "otp" | "reset">("email");
  const [email, setEmail] = useState("");

  const {
    register: emailRegister,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors, isSubmitting: isEmailSubmitting },
  } = useForm({
    resolver: zodResolver(EmailSchema),
  });

  const {
    register: otpRegister,
    handleSubmit: handleOtpSubmit,
    formState: { errors: otpErrors },
  } = useForm({
    resolver: zodResolver(OtpSchema),
  });

  const {
    register: resetRegister,
    handleSubmit: handleResetSubmit,
    formState: { errors: resetErrors },
  } = useForm({
    resolver: zodResolver(PasswordResetSchema),
  });

  const sendOtp = async (data: { email: string }) => {
    try {
      setEmail(data.email);
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/send-otp`,
        { email: data.email }
      );
      if (res.data.success) {
        toast.success("OTP sent to email");
        setStep("otp");
      } else {
        toast.error(res.data.message || "Failed to send OTP");
      }
    } catch {
      toast.error("Server error");
    }
  };

  const verifyOtp = async (data: { otp: string }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/verify-otp`,
        { email, otp: data.otp }
      );
      if (res.data.success) {
        toast.success("OTP verified");
        setStep("reset");
      } else {
        toast.error(res.data.message || "Invalid OTP");
      }
    } catch {
      toast.error("Verification failed");
    }
  };

  const resetPassword = async (data: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/reset-password`,
        { email, newPassword: data.newPassword }
      );
      if (res.data.success) {
        toast.success("Password reset successfully");
        navigate("/login");
      } else {
        toast.error(res.data.message || "Reset failed");
      }
    } catch {
      toast.error("Error resetting password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Forgot Password
        </h2>

        {step === "email" && (
          <form onSubmit={handleEmailSubmit(sendOtp)}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter your email
            </label>
            <div className="relative mb-4">
              <Mail className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
              <input
                type="email"
                placeholder="you@example.com"
                {...emailRegister("email")}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {emailErrors.email && (
                <p className="text-red-600 text-sm mt-1">
                  {emailErrors.email.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isEmailSubmitting}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-150 ${
                isEmailSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isEmailSubmitting ? "Sending..." : "Send OTP"}
            </button>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleOtpSubmit(verifyOtp)}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter the OTP sent to your email
            </label>
            <div className="relative mb-4">
              <ShieldCheck className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                {...otpRegister("otp")}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {otpErrors.otp && (
                <p className="text-red-600 text-sm mt-1">
                  {otpErrors.otp.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
            >
              Verify OTP
            </button>
          </form>
        )}

        {step === "reset" && (
          <form onSubmit={handleResetSubmit(resetPassword)}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <div className="relative mb-4">
              <Lock className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
              <input
                type="password"
                {...resetRegister("newPassword")}
                placeholder="New password"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {resetErrors.newPassword && (
                <p className="text-red-600 text-sm mt-1">
                  {resetErrors.newPassword.message}
                </p>
              )}
            </div>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative mb-6">
              <Lock className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
              <input
                type="password"
                {...resetRegister("confirmPassword")}
                placeholder="Confirm password"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {resetErrors.confirmPassword && (
                <p className="text-red-600 text-sm mt-1">
                  {resetErrors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
