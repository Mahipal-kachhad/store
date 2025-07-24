import { Request, Response } from "express";
import { ApiResponse, IProduct } from "../types/interfaces";
import productModel from "../models/productModel";

export const insertProduct = async (
  req: Request<{}, {}, IProduct>,
  res: Response<ApiResponse<IProduct>>
) => {
  try {
    const product = await productModel.create(req.body);
    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getAllProducts = async (
  req: Request,
  res: Response<ApiResponse<IProduct[]>>
) => {
  try {
    const products = await productModel.find().populate('category');
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getProduct = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse<IProduct>>
) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      res.status(404).json({
        success: false,
        error: "product not found",
      });
    } else {
      res.status(200).json({
        success: true,
        data: product,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const updateProduct = async (
  req: Request<{ id: string }, {}, IProduct>,
  res: Response<ApiResponse<IProduct>>
) => {
  try {
    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!product) {
      res.status(404).json({
        success: false,
        error: "product not found",
      });
    } else {
      res.status(200).json({
        success: true,
        data: product,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const deleteProduct = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse<IProduct>>
) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404).json({
        success: false,
        error: "product not found",
      });
    } else {
      res.status(200).json({
        success: true,
        data: product,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
