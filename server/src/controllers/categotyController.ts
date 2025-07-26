import { Request, Response } from "express";
import { ApiResponse, CategoryReq, ICategory } from "../types/interfaces";
import categoryModel from "../models/categoryModel";

export const insertCategory = async (
  req: Request<{}, {}, CategoryReq>,
  res: Response<ApiResponse<ICategory>>
) => {
  try {
    const category = await categoryModel.create(req.body);
    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getAllCategories = async (
  req: Request,
  res: Response<ApiResponse<ICategory[]>>
) => {
  try {
    const category = await categoryModel.find();
    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getCategory = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse<ICategory>>
) => {
  try {
    const category = await categoryModel.findById(req.params.id);
    if (!category) {
      res.status(404).json({
        success: false,
        error: "category not found",
      });
    } else {
      res.status(200).json({
        success: true,
        data: category,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const updateCategory = async (
  req: Request<{ id: string }, {}, CategoryReq>,
  res: Response<ApiResponse<ICategory>>
) => {
  try {
    const category = await categoryModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!category) {
      res.status(404).json({
        success: false,
        error: "category not found",
      });
    } else {
      res.status(200).json({
        success: true,
        data: category,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const deleteCategory = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse<ICategory>>
) => {
  try {
    const category = await categoryModel.findByIdAndDelete(req.params.id);
    if (!category) {
      res.status(404).json({
        success: false,
        error: "category not found",
      });
    } else {
      res.status(200).json({
        success: true,
        data: category,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
