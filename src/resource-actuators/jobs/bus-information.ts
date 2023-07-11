import { ResourceType } from "@prisma/client";
import prisma from "../../db/client";
import { scheduleJob } from "node-schedule";

export const baseURL = "http://10.10.10.104:8000";

export const sendBusInformationJob = async () => {
  const bus = await prisma.resource.findMany({
    where: { type: ResourceType.BUS },
  });

  bus.forEach(async (bus) => {
    const res = await fetch(`${baseURL}/adaptor/resources/${bus.uuid}/data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          bus_monitoring: [
            {
              air_activated: bus.air_activated,
              air_mode: bus.air_mode,
              location: { lon: bus.lon, lat: bus.lat },
              date: new Date().toISOString(),
              type: ResourceType.BUS,
            },
          ],
        },
      }),
    });
  });
};

export const runSendBusInformationJob = () => {
  scheduleJob("*/30 * * * * *", sendBusInformationJob);
};
