import { RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const jwtAdmin: RequestHandler = async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    res.status(401).json({
      success: false,
      error: "Unauthorized",
    });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
      if (decoded.role === "admin") {
        (req as any).user = decoded;
        next();
      } else {
        res.status(401).json({
          success: false,
          error: "Unauthorized",
        });
      }
    } catch {
      res.status(401).json({
        success: false,
        error: "Invalid token",
      });
    }
  }
};