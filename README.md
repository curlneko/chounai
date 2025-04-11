# chounai
Expressで町内会掲示板を作る

# 初期構成のコマンド
npm init -y
npm install express
npm install -D typescript ts-node-dev @types/node @types/express
npx tsc --init

npm install bcrypt jsonwebtoken cookie-parser dotenv
npm install -D typescript ts-node @types/node @types/express @types/bcrypt @types/jsonwebtoken @types/cookie-parser

# Docker関連コマンド
## 修正済みの設定で再起動
docker-compose up -d
## 前の定義を削除（ボリュームごと）
docker-compose down -v
## 起動してるか確認
docker ps
## DB接続確認
psql -h localhost -U user -d chounai_db
## 停止だけする
docker-compose stop
## 完全に削除（データ含む）
docker-compose down -v

# 起動時のコマンド
npm run dev

# フォルダ構成
src/
├── controllers/（ルートに対応する処理（コントローラー）を書く場所）
├── middleware/（リクエストとレスポンスの間に挟む処理）
├── models/（データ構造やORM（DBモデル）の定義）
├── routes/（エンドポイントとコントローラーの対応づけ）
├── services/（ビジネスロジックを書く場所）
├── utils/（汎用的な関数・ユーティリティ置き場）
├── types/（TypeScript型定義）
└── index.ts（エントリーポイント）
.env（環境変数）

# 機能
ログイン認証