import { pool } from "../db.js";

export const getOrders = async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM orders");
  return res.json(rows);
};

export const getOrder = async (req, res) => {
  const { orderId } = req.params;
  const { rows } = await pool.query("SELECT * FROM orders WHERE id = $1", [
    orderId,
  ]);

  if (rows.length == 0) {
    return res.status(404).json({ message: "Order not found" });
  }

  return res.json(rows[0]);
};

export const createOrder = async (req, res) => {
  try {
    const data = req.body;
    const { rows } = await pool.query(
      "INSERT INTO orders (client_name, dozens_amount, half_dozens_amount, sale_id, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        data.client_name,
        data.dozens_amount,
        data.half_dozens_amount,
        data.sale_id,
        data.user_id,
      ]
    );
    return res.json(rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
