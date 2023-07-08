import { Request, Response } from "express";
import {
  getBusByUuid,
  turnOnAirConditioner,
  turnOffAirConditioner,
} from "../services/bus-service";

export const resourceCallback = async (req: Request, res: Response) => {
  const { busUuid } = req.params;
  const { body } = req;
  const bus = await getBusByUuid(busUuid);

  if (!bus) {
    return res.status(404).json({ message: "Bus not found" });
  }

  // TODO: test with wrong capability and value
  if (body.command?.capability !== "air_control") {
    return res.status(400).json({ message: "Invalid capability" });
  }

  const { value } = body.command;

  if (value === "on") {
    await turnOnAirConditioner(busUuid);
    return res.status(200).json({ message: "Air conditioning turned on" });
  }

  if (value === "off") {
    await turnOffAirConditioner(busUuid);
    return res.status(200).json({ message: "Air conditioning turned off" });
  }

  return res.status(400).json({ message: "Invalid value" });
};
