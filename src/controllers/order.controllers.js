import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getOrders = async (req, res) => {
  const orders = await prisma.order.findMany();
  return res.json(orders);
};

export const getOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await prisma.order.findFirst({
      where: {
        id: parseInt(orderId),
      },
    });

    return res.json(order);
  } catch (error) {
    return res.status(404).json({ message: "Order not found" });
  }
};

export const createOrder = async (req, res) => {
  try {
    const data = req.body;
    const newOrder = await prisma.order.create({
      data: {
        client: data.client_name,
        dozenAmount: parseInt(data.dozens_amount),
        halfDozenAmount: parseInt(data.half_dozens_amount),
        sellerId: parseInt(data.user_id),
        saleId: parseInt(data.sale_id),
      },
    });

    return res.json(newOrder);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
