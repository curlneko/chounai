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

export const protectedRoute = async (req: Request, res: Response) => {
  res.json({ message: "This is protected data" });
};
