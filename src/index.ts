import express, { Request, Response } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import { authenticateToken } from "./middleware/authMiddleware";

// 環境変数読み込む
dotenv.config();

// Express アプリケーションのインスタンスを作成
const app = express();
// application/json のリクエストボディを自動でパースしてくれるミドルウェア
app.use(express.json());

// 全てのリクエストでトークン検査を行う
app.use(authenticateToken);

app.use("/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
