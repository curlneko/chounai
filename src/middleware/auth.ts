import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // "Bearer token" 形式でトークンを取得
  const token = req.header("Authorization")?.split(" ")[1];

  const isLogin = req.path === "/auth/login";
  const isSignup = req.path === "/auth/sighup";

  // トークンがない場合
  if (!token) {
    // ログインかサインアップしたい人の場合はログイン処理をさせる
    if (isLogin || isSignup) {
      next();
      return;
    } else {
      // その他画面へアクセスしたい人の場合は止める
      res
        .status(401)
        .json({ message: "Tokenがないため、ログインが必要です。" });
      return;
    }
  }

  // トークンがある場合、検証を行う
  try {
    // トークンのDecode
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);

    // セッションの存在チェック
    const session = await prisma.session.findUnique({
      where: { token },
    });

    // セッションの有効期限チェック
    if (!session || session.expiresAt < new Date()) {
      res.status(401).json({ message: "セッション切れです。" });
    }

    // トークンが有効が、ログインかサインアップが来た → ホームへリダイレクト
    if (isLogin || isSignup) {
      res.status(302).redirect("/");
      return;
    }

    // ユーザー情報をリクエストに追加
    (req as any).user = { user: decodedToken };

    next();
    return;
  } catch (err) {
    res.status(403).json({ message: "無効なトークンです。" });
    return;
  }
};
