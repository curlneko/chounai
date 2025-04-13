import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authenticateUser = async (
  username: string,
  password: string
): Promise<string | null> => {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1h",
    }
  );

  return token;
};
