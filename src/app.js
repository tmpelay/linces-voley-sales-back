import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import orderRoutes from "./routes/order.routes.js";
import saleRoutes from "./routes/sale.routes.js";

const app = express();

app.use(
  cors({
    origin: "https://linces-voley-sales-front.vercel.app",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/api", userRoutes);
app.use("/api", authRoutes);
app.use("/api", orderRoutes);
app.use("/api", saleRoutes);

export default app;
