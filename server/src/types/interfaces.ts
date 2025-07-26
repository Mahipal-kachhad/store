import { Document, Types } from "mongoose";
import { Request } from "express";

export interface IUser extends Document {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  role: "user" | "admin" | "vendor";
  cart: { product: Types.ObjectId; quantity: number }[];
  orders: { product: Types.ObjectId; quantity: number }[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RegisterUserReq extends Request {
  body: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: IUser["role"];
  };
}

export interface IUserUpdate {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: IUser["role"];
}

export interface UserResponse {
  firstName: string;
  lastName?: string;
  email?: string;
  cart: { product: Types.ObjectId; quantity: number }[];
  orders: { product: Types.ObjectId; quantity: number }[];
  role: IUser["role"];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface IProduct extends Document {
  name: string;
  description?: string;
  price: number;
  images: string[];
  category: Types.ObjectId;
  inStock: boolean;
  countInStock: number;
  rating: number;
  numReviews: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICategory extends Document {
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface CategoryReq {
  name: string;
  description?: string;
}

export interface ICart {
  product: Types.ObjectId;
  quantity: number;
}
[];

export interface IOrder extends Document {
  user: Types.ObjectId;
  items: {
    product: Types.ObjectId;
    quantity: number;
    priceAtPurchase: number;
  }[];
  totalAmount: number;
  paymentStatus: "pending" | "paid" | "failed";
  paymentIntentId?: string;
  shippingAddress: string;
  delivered: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface OtpDocument extends Document {
  email: string;
  otp: string;
  expiresAt: Date;
  verified: boolean;
}
