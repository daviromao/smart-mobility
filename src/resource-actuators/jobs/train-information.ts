import { ResourceType } from "@prisma/client";
import prisma from "../../db/client";
import { scheduleJob } from "node-schedule";

export const baseURL = "http://10.10.10.104:8000";

export const sendMetroInformationJob = async () => {
  const trains = await prisma.resource.findMany({
    where: { type: ResourceType.SUBWAY_TRAIN },
  });

  trains.forEach(async (train) => {
    const res = await fetch(`${baseURL}/adaptor/resources/${train.uuid}/data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          train_monitoring: [
            {
              air_activated: train.air_activated,
              air_mode: train.air_mode,
              location: { lon: train.lon, lat: train.lat },
              date: new Date().toISOString(),
              type: ResourceType.SUBWAY_TRAIN,
            },
          ],
        },
      }),
    });
  });
};

export const runSendTrainInformationJob = () => {
  scheduleJob("*/30 * * * * *", sendMetroInformationJob);
};
