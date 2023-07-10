import {
  turnOnAirConditioner,
  turnOffAirConditioner,
} from "../services/resource-service";

import { prismaMock } from "../../db/singleton";

describe("turnOnAirConditioner", () => {
  const uuid = "uuid1";
  const resource = {
    id: 1,
    uuid: uuid,
    air_activated: false,
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should call the prisma client with the correct turn on parameters", async () => {
    await turnOnAirConditioner(uuid);

    expect(prismaMock.resource.update).toHaveBeenCalledWith({
      where: { uuid: uuid },
      data: { air_activated: true },
    });
  });

  it("should return the resource with the air conditioning turned on", async () => {
    prismaMock.resource.update.mockResolvedValue({
      ...resource,
      air_activated: true,
    } as any);

    const result = await turnOnAirConditioner(uuid);
    expect(result?.air_activated).toEqual(true);
  });
});

describe("turnOffAirConditioner", () => {
  const uuid = "uuid1";
  const resource = {
    id: 1,
    uuid: uuid,
    air_activated: true,
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should call the prisma client with the correct turn off parameters", async () => {
    await turnOffAirConditioner(uuid);

    expect(prismaMock.resource.update).toHaveBeenCalledWith({
      where: { uuid: uuid },
      data: { air_activated: false },
    });
  });

  it("should return the resource with the air conditioning turned off", async () => {
    prismaMock.resource.update.mockResolvedValue({
      ...resource,
      air_activated: false,
    } as any);

    const result = await turnOffAirConditioner(uuid);
    expect(result?.air_activated).toEqual(false);
  });
});
