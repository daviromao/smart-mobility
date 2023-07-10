import { AirMode, Bus, Prisma } from "@prisma/client";
import prisma from "../../db/client";

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

//TODO: test with change AirMode
export async function changeAirMode(uuid: string): Promise<Bus | null> {
  const bus = await prisma.bus.findUnique({ where: { uuid } });

  return prisma.bus.update({
    where: { uuid },
    data: {
      air_mode:
        bus?.air_mode === AirMode.AUTOMATIC
          ? AirMode.MANUAL
          : AirMode.AUTOMATIC,
    },
  });
}
