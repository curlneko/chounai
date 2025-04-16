import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // "Bearer token" 形式でトークンを取得
  const token = req.header("Authorization")?.split(" ")[1];
  const isLoginPath = req.path === "/auth/login";

  // トークンがない場合
  if (!token) {
    // ログインしたい人の場合はログイン処理をさせる
    if (isLoginPath) {
      next();
      return;
    } else {
      // その他画面へアクセスしたい人の場合は止める
      res.status(401).json({ message: "ログインが必要です。" });
      return;
    }
  }

  // トークンがある場合、検証を行う
  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    // トークン検証失敗
    if (err) {
      res.status(403).json({ message: "無効なトークンです。" });
      return;
    }
    (req as any).user = user; // ユーザー情報をリクエストに追加

    // トークンがあってログインパスに来た → ホームへリダイレクト
    if (isLoginPath) {
      res.status(302).redirect("/");
      return;
    }

    // トークンもOK、リクエスト継続
    next();
    return;
  });
};
