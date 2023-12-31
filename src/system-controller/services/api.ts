import { ResourceDataResponse } from "../interfaces/resource-data-response";
import prisma from "../../db/client";
import { AirMode } from "@prisma/client";
import { baseURL } from "../../resource-actuators/jobs/bus-information";

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

export async function sendCommandToAirConditioners(uuids: string[], command: string) {
  const baseUrl = process.env.BASE_URL;

  const commandData = uuids.map((uuid) => {
    return {
      uuid: uuid,
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

export async function sendCommandToAllAutomaticAirConditioners(
  capability: string,
  command: string
) {
  const discoveryResources = await fetch(
    `${baseURL}/discovery/resources?capability=${capability}&air_mode.in[]=AUTOMATIC`
  );

  const response = await discoveryResources.json();
  const uuids = response.resources.map((resource: any) => resource.uuid);
  await sendCommandToAirConditioners(uuids, command);
}
