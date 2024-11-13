import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { createAccesToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status("400").json({
        message: "Please provide all user details",
      });
    }

    try {
      const user = await prisma.user.findFirst({
        where: {
          username: username,
        },
      });

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({
          message: "Invalid password",
        });
      }

      const token = await createAccesToken({ id: user.id });

      res.cookie("token", token);

      return res.status(200).json({
        message: "User logged in succesfully",
        user: {
          username: user.username,
          name: user.name,
          lastname: user.lastname,
        },
      });
    } catch (error) {
      return res.status(400).json({
        message: "User does not exist",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  res.sendStatus(200);
};

export const verifyToken = (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    try {
      const userFound = await prisma.user.findFirst({
        where: {
          id: user.id,
        },
      });

      return res.json({
        id: userFound.id,
        username: userFound.username,
      });
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  });
};
