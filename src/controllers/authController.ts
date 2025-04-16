import { Request, Response } from "express";
import * as authService from "../services/authService";

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const token = await authService.authenticateUser(username, password);
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

  const existingUSer = await authService.findUserByUsername(username);
  if (existingUSer) {
    res.status(409).json({ message: "すでに登録されています。" });
  }

  const token = await authService.createUser(username, password);

  res.status(201).json({ token });
};

export const protectedRoute = async (req: Request, res: Response) => {
  res.json({ message: "This is protected data" });
};
