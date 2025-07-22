import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const userAuth: RequestHandler = async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    res.status(401).json({
      success: false,
      error: "Unauthorized",
    });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      (req as any).user = decoded;
      next();
    } catch {
      res.status(401).json({
        success: false,
        error: "Invalid token",
      });
    }
  }
};
