import { pool } from "../db.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM users");
  return res.json(rows);
};

export const getUser = async (req, res) => {
  const { userId } = req.params;
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
    userId,
  ]);

  if (rows.length == 0) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json(rows[0]);
};

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const createUser = async (req, res) => {
  try {
    const data = req.body;
    const password = await encryptPassword(data.password);
    const { rows } = await pool.query(
      "INSERT INTO users (username, firstname, lastname, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [data.username, data.firstname, data.lastname, password, data.role]
    );
    return res.json(rows[0]);
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
  const { rows, rowCount } = await pool.query(
    "UPDATE users SET username = $1, firstname = $2, lastname = $3, password = $4, role = $5 WHERE id = $6 RETURNING *",
    [data.username, data.firstname, data.lastname, password, data.role, userId]
  );

  if (rowCount === 0) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json(rows[0]);
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  const { rowCount } = await pool.query("DELETE FROM users WHERE id = $1", [
    userId,
  ]);

  if (rowCount === 0) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.sendStatus(204);
};
