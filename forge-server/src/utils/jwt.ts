import jwt, { Secret, SignOptions } from "jsonwebtoken";

export function generateAccessToken(userId: string) {
  return jwt.sign(
    { userId },
    process.env.JWT_ACCESS_SECRET as Secret,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN as SignOptions["expiresIn"],
    }
  );
}

export function generateRefreshToken(userId: string) {
  return jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET as Secret,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN as SignOptions["expiresIn"],
    }
  );
}