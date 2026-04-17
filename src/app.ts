import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.middleware";

const app = express();


app.use(cors({ origin: "*" })); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.use(errorHandler);

export default app;