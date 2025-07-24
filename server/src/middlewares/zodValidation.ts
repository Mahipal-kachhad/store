import { RequestHandler } from "express";
import { z, ZodType } from "zod/v4";

export const validateRegister =
  (schema: ZodType): RequestHandler =>
    (req, res, next) => {
      const result = schema.safeParse(req.body);
      if (!result.success) {
        res.status(400).json({
          success: false,
          error: z.treeifyError(result.error),
        });
        return;
      }
      req.body = result.data;
      next();
    };

export const validateLogin =
  (schema: ZodType): RequestHandler =>
    (req, res, next) => {
      const result = schema.safeParse(req.body);
      if (!result.success) {
        res.status(400).json({
          success: false,
          error: z.treeifyError(result.error),
        });
        return;
      }
      req.body = result.data;
      next();
    };
