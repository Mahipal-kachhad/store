import { Request, Response } from "express";
import {
  ApiResponse,
  IUser,
  RegisterUserReq,
  UserResponse,
} from "../types/interfaces";
import bcrypt from "bcrypt";
import userModel from "../models/userModel";
import jwt from "jsonwebtoken";

export const registerUser = async (
  req: RegisterUserReq,
  res: Response<ApiResponse<IUser>>
) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    const newPassword = await bcrypt.hash(password, 10);
    await userModel.create({
      firstName,
      lastName,
      email,
      password: newPassword,
      role,
      cart: [],
      orders: [],
    });
    res.status(201).json({
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const authenticateUser = async (
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response<ApiResponse<IUser>>
) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(401).json({
        success: false,
        error: "Invalid Credentials",
      });
      return;
    } else {
      const authResult = await bcrypt.compare(password, user.password);
      if (!authResult) {
        res.status(401).json({
          success: false,
          error: "Invalid Credentials",
        });
        return;
      }
      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET!,
        {
          expiresIn: "1h",
        }
      );

      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 1000 * 60 * 60,
      });

      res.status(200).json({
        success: true,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getMe = async (
  req: Request,
  res: Response<ApiResponse<UserResponse>>
) => {
  try {
    const { id } = (req as any).user;
    const user = await userModel
      .findById(id)
      .select("lastName firstName cart orders role -_id")
      .populate("cart.product", "name price description images _id");
    if (!user) {
      res.status(404).json({
        success: false,
        error: "user not found",
      });
    } else {
      res.status(200).json({
        success: true,
        data: user,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const changePassword = async (
  req: Request<{}, {}, { oldPassword: string; newPassword: string }>,
  res: Response<ApiResponse<{}>>
) => {
  try {
    const { id } = (req as any).user;
    const { oldPassword, newPassword } = req.body;
    const user = await userModel.findById(id);
    if (!user) {
      res.status(404).json({
        success: false,
        error: "user not found",
      });
    } else {
      const result = await bcrypt.compare(oldPassword, user.password);
      if (!result) {
        res.status(403).json({
          success: false,
          error: "wrong old password",
        });
      } else {
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        res.status(200).json({
          success: true,
        });
      }
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const forgetPassword = async (
  req: Request<{}, {}, { newPassword: string }>,
  res: Response<ApiResponse<{}>>
) => {
  try {
    const { id } = (req as any).user;
    const { newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await userModel.findById(id);
    if (!user) {
      res.status(404).json({
        success: false,
        error: "user not found",
      });
    } else {
      user.password = hashedPassword;
      await user.save();
      res.status(200).json({
        success: true,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token", {
    sameSite: "lax",
    secure: false,
    httpOnly: true,
  });
  res.json({
    success: true,
  });
};