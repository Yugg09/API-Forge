import bcrypt from "bcrypt";
import { User } from "../models/User.model";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

type LoginUserInput = {
  email: string;
  password: string;
};

export async function loginUser(data: LoginUserInput) {
  const user = await User.findOne({
    email: data.email,
  }).select("+password");

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(
    data.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const accessToken = generateAccessToken(user._id.toString());

  const refreshToken = generateRefreshToken(user._id.toString());

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    accessToken,
    refreshToken,
  };
}

const SALT_ROUNDS = 10;

type RegisterUserInput = {
  name: string;
  email: string;
  password: string;
};

export async function registerUser(data: RegisterUserInput) {
  // Check if user already exists
  const existingUser = await User.exists({
    email: data.email,
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(
    data.password,
    SALT_ROUNDS
  );

  // Create user
  const user = await User.create({
    ...data,
    password: hashedPassword,
  });

  // Fetch user without password
  const createdUser = await User.findById(user._id).select(
    "-password"
  );

  if (!createdUser) {
    throw new Error("Failed to create user");
  }

  return createdUser;
}