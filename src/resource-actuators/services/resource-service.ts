import { AirMode, Resource } from "@prisma/client";
import prisma from "../../db/client";

export async function getResourceByUuid(
  uuid: string
): Promise<Resource | null> {
  return prisma.resource.findUnique({ where: { uuid } });
}

export async function turnOnAirConditioner(
  uuid: string
): Promise<Resource | null> {
  return prisma.resource.update({
    where: { uuid },
    data: { air_activated: true },
  });
}

export async function turnOffAirConditioner(
  uuid: string
): Promise<Resource | null> {
  return prisma.resource.update({
    where: { uuid },
    data: { air_activated: false },
  });
}

//TODO: test with change AirMode
export async function changeAirMode(uuid: string): Promise<Resource | null> {
  const bus = await prisma.resource.findUnique({ where: { uuid } });

  return prisma.resource.update({
    where: { uuid },
    data: {
      air_mode:
        bus?.air_mode === AirMode.AUTOMATIC
          ? AirMode.MANUAL
          : AirMode.AUTOMATIC,
    },
  });
}
