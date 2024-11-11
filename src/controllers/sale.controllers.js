import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getSales = async (req, res) => {
  const sales = await prisma.sale.findMany();
  return res.json(sales);
};

export const getSale = async (req, res) => {
  const { saleId } = req.params;

  try {
    const sale = await prisma.sale.findFirst({
      where: {
        id: parseInt(saleId),
      },
    });

    return res.json(sale);
  } catch (error) {
    return res.status(404).json({ message: "Sale not found" });
  }
};
