import { Request, Response } from "express";
import * as auth from "../services/auth";

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const token = await auth.authenticateUser(username, password);
  if (token) {
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

export const signup = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: "メールとパスワードは必須です。" });
  }

  const existingUSer = await auth.findUserByUsername(username);
  if (existingUSer) {
    res.status(409).json({ message: "すでに登録されています。" });
  }

  const token = await auth.createUser(username, password);

  res.status(201).json({ token });
};

export const logout = async (req: Request, res: Response) => {
  // "Bearer token" 形式でトークンを取得
  const token = req.header("Authorization")?.split(" ")[1] || "";

  await auth.logout(token);

  res.status(200).json({ message: "ログアウトしました！" });
};

export const protectedRoute = async (req: Request, res: Response) => {
  res.json({ message: "This is protected data" });
};
