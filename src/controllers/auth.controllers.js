import { pool } from "../db.js";
import bcrypt from "bcrypt";
import { createAccesToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status("400").json({
        message: "Please provide all user details",
      });
    }

    const user = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (user.rows.lenght === 0) {
      return res.status(400).json({
        message: "User does not exist",
      });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const token = await createAccesToken({ if: user.rows[0].id });

    res.cookie("token", token);

    return res.status(200).json({
      message: "User logged in succesfully",
      user: {
        id: user.rows[0].id,
        username: user.rows[0].username,
        role: user.rows[0].role,
      },
    });
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

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    const userFound = await pool.query("SELECT * FROM users WHERE id = $1", [
      user.if,
    ]);
    if (!userFound) return res.status(401).json({ message: "Unauthorized" });

    return res.json({
      id: userFound.rows[0].id,
      username: userFound.rows[0].username,
      role: userFound.rows[0].role,
    });
  });
};
