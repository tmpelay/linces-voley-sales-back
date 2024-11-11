import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const getUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  return res.json(users);
};

export const getUser = async (req, res) => {
  const { userId } = req.params;

  const user = await prisma.user.findFirst({
    where: {
      id: parseInt(userId),
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json(user);
};

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const createUser = async (req, res) => {
  try {
    const data = req.body;
    const password = await encryptPassword(data.password);

    const newUser = await prisma.user.create({
      data: {
        username: data.username,
        name: data.name,
        lastname: data.lastname,
        password: password,
      },
    });

    return res.json(newUser);
  } catch (error) {
    console.log(error);

    if (error?.code == "23505") {
      return res.status(409).json({ message: "Username already exists" });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  const { userId } = req.params;
  const data = req.body;
  const password = await encryptPassword(data.password);

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(userId),
      },
      data: {
        username: data.username,
        name: data.name,
        lastname: data.lastname,
        password: password,
      },
    });
  } catch (error) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json(updatedUser);
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id: parseInt(userId),
      },
    });

    return res.json(deletedUser);
  } catch (error) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.sendStatus(204);
};
