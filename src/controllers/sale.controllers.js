import { pool } from "./../db.js";

export const getSales = async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM sales");
  return res.json(rows);
};

export const getSale = async (req, res) => {
  const { saleId } = req.params;
  const { rows } = await pool.query("SELECT * FROM sales WHERE id = $1", [
    saleId,
  ]);

  if (rows.length == 0) {
    return res.status(404).json({ message: "Sale not found" });
  }

  return res.json(rows[0]);
};
