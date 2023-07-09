import express, { Request, Response } from "express";
import { resourceCallback } from "./controllers/bus-controller";
import { runSendBusInformationJob } from "./jobs/bus-information";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

app.post("/resource-webhook/:busUuid", resourceCallback);

app.listen(3000, () => {
  runSendBusInformationJob();
});
