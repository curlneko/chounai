import jwt from "jsonwebtoken";

export const authenticateUser = async (
  username: string,
  password: string
): Promise<string | null> => {
  // 今後DBにアクセスしてログイン認証を行う
  if (username === "admin" && password === "password") {
    const token = jwt.sign({ username }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
    return token;
  }
  return null;
};
