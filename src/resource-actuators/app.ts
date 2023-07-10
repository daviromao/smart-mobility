import express, { Request, Response } from "express";
import { resourceCallback } from "./controllers/resource-controller";
import { runJobs } from "./jobs";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

app.post("/resource-webhook/:uuid", resourceCallback);

app.listen(3000, () => {
  runJobs();
});
