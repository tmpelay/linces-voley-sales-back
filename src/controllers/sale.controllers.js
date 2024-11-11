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

export const createSale = async (req, res) => {
  try {
    const data = req.body;

    const newSale = await prisma.sale.create({
      data: {
        dozenPrice: data.dozen_price,
        halfDozenPrice: data.half_dozen_price,
        date: data.date,
        active: data.active,
      },
    });

    return res.json(newSale);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
