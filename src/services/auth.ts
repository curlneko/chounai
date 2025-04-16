import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import prisma from "../lib/prisma";

export const authenticateUser = async (
  username: string,
  password: string
): Promise<string | null> => {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  // Token作成
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1h",
    }
  );

  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  // TokenをSessionテーブルに登録
  await prisma.session.create({
    data: {
      token,
      userId: user.id,
      expiresAt,
    },
  });

  return token;
};

export const createUser = async (username: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  // ユーザをUserテーブルに新規登録
  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  // Token作成
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1h",
    }
  );

  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  // TokenをSessionテーブルに登録
  await prisma.session.create({
    data: {
      token,
      userId: user.id,
      expiresAt,
    },
  });

  return token;
};

export const logout = async (token: string) => {
  if (token) {
    return await prisma.session.deleteMany({
      where: { token },
    });
  }
};

export const findUserByUsername = async (username: string) => {
  return await prisma.user.findUnique({
    where: { username },
  });
};
