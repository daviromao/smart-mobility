import { Bus } from "@prisma/client";
import prisma from "../prisma";

export async function getBusByUuid(uuid: string): Promise<Bus | null> {
  return prisma.bus.findUnique({ where: { uuid } });
}

export async function turnOnAirConditioner(uuid: string): Promise<Bus | null> {
  return prisma.bus.update({
    where: { uuid },
    data: { air_activated: true },
  });
}

export async function turnOffAirConditioner(uuid: string): Promise<Bus | null> {
  return prisma.bus.update({
    where: { uuid },
    data: { air_activated: false },
  });
}
