import { Request, Response } from "express";
import {
    registerUser,
    loginUser,
  } from "../services/auth.service";

  import { authenticate } from "../middleware/auth.middleware";

export async function register(
  req: Request,
  res: Response
) {
  try {
    const user = await registerUser(req.body);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

export async function login(
    req: Request,
    res: Response
  ) {
    try {
      const result = await loginUser(req.body);
  
      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: false, // true in production
        sameSite: "lax",
      });
  
      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          user: result.user,
          accessToken: result.accessToken,
        },
      });
    } catch (error) {
      console.error(error);
  
      if (error instanceof Error) {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }
  
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }
  }

  export async function me(
    req: Request,
    res: Response
  ) {
    return res.status(200).json({
      success: true,
      data: (req as any).user,
    });
  }

  export async function logout(
    req: Request,
    res: Response
  ) {
    res.clearCookie("refreshToken");
  
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  }