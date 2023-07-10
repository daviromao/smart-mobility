import { ResourceType } from "@prisma/client";
import prisma from "../../db/client";
import { scheduleJob } from "node-schedule";

export const baseURL = "http://10.10.10.104:8000";

export const sendRoomInformationJob = async () => {
  const rooms = await prisma.resource.findMany({
    where: { type: ResourceType.SUBWAY_ROOM },
  });

  rooms.forEach(async (room) => {
    const res = await fetch(`${baseURL}/adaptor/resources/${room.uuid}/data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          room_monitoring: [
            {
              air_activated: room.air_activated,
              air_mode: room.air_mode,
              date: new Date().toISOString(),
            },
          ],
        },
      }),
    });
  });
};

export const runSendRoomInformationJob = () => {
  scheduleJob("*/30 * * * * *", sendRoomInformationJob);
};
