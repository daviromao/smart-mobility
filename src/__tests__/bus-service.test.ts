import exp from "constants";
import {
  turnOnAirConditioner,
  turnOffAirConditioner,
} from "../services/bus-service";

import { prismaMock } from "../prisma/singleton";

describe("turnOnAirConditioner", () => {
  const busUuid = "uuid1";
  const bus = {
    id: 1,
    uuid: busUuid,
    air_activated: false,
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should call the prisma client with the correct turn on parameters", async () => {
    await turnOnAirConditioner(busUuid);

    expect(prismaMock.bus.update).toHaveBeenCalledWith({
      where: { uuid: busUuid },
      data: { air_activated: true },
    });
  });

  it("should return the bus with the air conditioning turned on", async () => {
    prismaMock.bus.update.mockResolvedValue({
      ...bus,
      air_activated: true,
    } as any);

    const result = await turnOnAirConditioner(busUuid);
    expect(result?.air_activated).toEqual(true);
  });
});

describe("turnOffAirConditioner", () => {
  const busUuid = "uuid1";
  const bus = {
    id: 1,
    uuid: busUuid,
    air_activated: true,
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should call the prisma client with the correct turn off parameters", async () => {
    await turnOffAirConditioner(busUuid);

    expect(prismaMock.bus.update).toHaveBeenCalledWith({
      where: { uuid: busUuid },
      data: { air_activated: false },
    });
  });

  it("should return the bus with the air conditioning turned off", async () => {
    prismaMock.bus.update.mockResolvedValue({
      ...bus,
      air_activated: false,
    } as any);

    const result = await turnOffAirConditioner(busUuid);
    expect(result?.air_activated).toEqual(false);
  });
});
