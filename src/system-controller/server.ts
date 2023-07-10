import express, { Request, Response } from "express";
import { runControlAirConditionerJob } from "./jobs/temperature-control";
import { consts } from "./config/consts";
import { sendCommandToAirConditioners } from "./services/api";

const app = express();

app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.get("/", (req: Request, res: Response) => {
  res.redirect("/monitor");
});

app.get("/monitor", (req: Request, res: Response) => {
  res.sendFile(__dirname + "/view/index.html");
});

app.get("/monitor/temperature", (req: Request, res: Response) => {
  res.json(consts.currentTemperature);
});

app.post("/command", (req: Request, res: Response) => {
  const command = req.body.command;
  const uuids = req.body.uuids;

  sendCommandToAirConditioners(uuids, command);
  res.json({ message: "Command sent" });
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
  runControlAirConditionerJob();
});
