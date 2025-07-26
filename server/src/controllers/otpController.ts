import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../types/interfaces";
import otpModel from "../models/otpModel";
import { sendOtpEmail } from "../utils/mailer";

export const sendOtp = async (
  req: Request<{}, {}, { email: string }>,
  res: Response<ApiResponse<{}>>,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({
        success: false,
        error: "email is Required",
      });
      return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    await otpModel.deleteMany({ email });
    await otpModel.create({ email, otp, expiresAt });
    await sendOtpEmail(email, otp);
    res.status(200).json({
      success: true,
      data: "otp sent successfully",
    });
    next();
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const verifyOtp = async (
  req: Request<{}, {}, { email: string; otp: string }>,
  res: Response<ApiResponse<{}>>
) => {
  try {
    const { email, otp } = req.body;
    const record = await otpModel.findOne({ email, otp });
    if (!record) {
      res.status(400).json({
        success: false,
        error: "invalid OTP",
      });
    } else if (record.verified) {
      res.status(400).json({
        success: false,
        error: "OTP already used",
      });
    } else if (record.expiresAt < new Date()) {
      res.status(400).json({
        success: false,
        error: "OTP expired",
      });
    } else {
      record.verified = true;
      await record.save();
      res.status(200).json({
        success: true,
        data: {
          message: "OTP verified successfully",
        },
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
