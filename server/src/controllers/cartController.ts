import { Request, Response } from "express";
import { ApiResponse, ICart, IUser } from "../types/interfaces";
import userModel from "../models/userModel";
import { Types } from "mongoose";

export const getCart = async (
  req: Request,
  res: Response<ApiResponse<IUser["cart"]>>
) => {
  try {
    const { id } = (req as any).user;
    const user = await userModel.findById(id, "cart");
    const cart = user?.cart || [];
    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false, 
      error: error.message,
    });
  }
};

export const insertCartItem = async (
  req: Request<{ id: string }, {}, ICart>,
  res: Response<ApiResponse<IUser["cart"]>>
) => {
  try {
    const { id } = (req as any).user;
    const user = await userModel.findById(id, "cart");
    if (user) {
      user.cart.push(req.body);
      await user.save();
      res.status(200).json({
        success: true,
        data: user.cart,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const updateCart = async (
  req: Request<{ id: string }, {}, ICart>,
  res: Response<ApiResponse<IUser["cart"]>>
) => {
  try {
    const { id } = (req as any).user;
    const { product, quantity } = req.body;
    const user = await userModel.findById(id, "cart");
    if (user) {
      user.cart = user.cart.map((val) => {
        if (val.product.toString() === product.toString()) {
          val.quantity = quantity;
        }
        return val;
      });
      await user.save();
      res.status(200).json({
        success: true,
        data: user.cart,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const removeCartItem = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse<IUser["cart"]>>
) => {
  try {
    const { id } = (req as any).user;
    const product = new Types.ObjectId(req.params.id);
    const user = await userModel.findById(id, "cart");
    if (user) {
      user.cart = user.cart.filter(
        (val) => val.product.toString() !== product.toString()
      );
      await user.save();
      res.status(200).json({
        success: true,
        data:user.cart
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const clearCart = async (
  req: Request,
  res: Response<ApiResponse<{ success: boolean }>>
) => {
  try {
    const { id } = (req as any).user;
    const user = await userModel.findById(id, "cart");
    if (user) {
      user.cart = [];
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
