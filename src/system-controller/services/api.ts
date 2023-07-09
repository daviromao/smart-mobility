import { ResourceDataResponse } from "../interfaces/resource-data-response";
import prisma from "../../db/client";
import { AirMode } from "@prisma/client";

export async function fetchTemperatureData(): Promise<ResourceDataResponse[]> {
  const baseUrl = process.env.BASE_URL;
  const request = await fetch(baseUrl + "/collector/resources/data/last", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      capabilities: ["environment_monitoring"],
    }),
  });

  const response = await request.json();

  return response.resources;
}

export async function sendCommandToAirConditioner(command: string) {
  const baseUrl = process.env.BASE_URL;

  // TODO: test with air_mode: MANUAL
  const busActuators = await prisma.bus.findMany({
    where: {
      air_mode: AirMode.AUTOMATIC,
    },
  });

  const commandData = busActuators.map((busActuator) => {
    return {
      uuid: busActuator.uuid,
      capabilities: {
        air_control: command,
      },
    };
  });

  await fetch(baseUrl + "/actuator/commands", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: commandData }),
  });
}
