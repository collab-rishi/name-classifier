import express from "express";
import cors from "cors";
import classifyRoutes from "./routes/classify.routes";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { Request, Response } from 'express';
const app = express();


app.use(cors({
  origin: '*',
  methods: ['GET'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.use("/api", classifyRoutes);

app.use(errorHandler);

export default app;