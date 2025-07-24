import { Request, Response } from "express";
import { ApiResponse, IUser, IUserUpdate } from "../types/interfaces";
import userModel from "../models/userModel";
import bcrypt from "bcrypt"

export const getAllUser = async (
  req: Request,
  res: Response<ApiResponse<IUser[]>>
) => {
  try {
    const { email } = (req as any).user;
    const users = await userModel.find({ email: { $ne: email } });
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getUser = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse<IUser>>
) => {
  try {
    const user = await userModel.findById(req.params.id);
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

export const updateUser = async (
  req: Request<{ id: string }, {}, IUserUpdate>,
  res: Response<ApiResponse<IUser>>
) => {
  try {
    const { firstName, lastName, email, role, password } = req.body;
    const newPassword = await bcrypt.hash(password, 10);
    const user = await userModel.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email, role, password: newPassword },
      { new: true }
    );
    if (!user) {
      res.status(404).json({
        success: false,
        error: "user not found",
      });
    } else {
      res.status(200).json({ success: true, data: user });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse<IUser>>
) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({
        success: false,
        error: "user not found",
      });
    } else {
      res.status(200).json({ success: true, data: user });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
