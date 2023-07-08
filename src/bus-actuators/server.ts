import express, { Request, Response } from "express";
import { resourceCallback } from "./controllers/bus-controller";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

app.post("/resource-webhook/:busUuid", resourceCallback);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
