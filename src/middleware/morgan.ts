import morgan from "morgan";
import logger from "../utils/logger";

// morgan に「ログの出力先（stream）」を指定するための設定
// morgan はデフォルトで console.log に出力しますが、それを winston に渡すことで統一管理できます。
const stream = {
  write: (message: string) => logger.info(message.trim()),
};

// 'combined': 定義済みのログフォーマット（Apache風）を使用。 
// 例: ::1 - - [16/Apr/2025:12:34:56 +0000] "GET /api/user HTTP/1.1" 200 123
// { stream }: 出力先を上記の winston に設定。
export const morganMiddleware = morgan("combined", { stream });
