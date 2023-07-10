import { fetchTemperatureData, sendCommandToAllAutomaticAirConditioners } from "../services/api";
import { prismaMock } from "../../db/singleton";

jest.mock("node-fetch");

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ test: 100 }),
  })
) as jest.Mock;

describe("API Service Unit Tests", () => {
  const mockBaseUrl = "http://mocked-base-url";

  beforeAll(() => {
    process.env.BASE_URL = mockBaseUrl;
  });

  afterAll(() => {
    delete process.env.BASE_URL;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch temperature data successfully", async () => {
    const mockResponse = {
      resources: [
        {
          capabilities: {
            environment_monitoring: [
              {
                temperature: 25,
              },
            ],
          },
        },
        {
          capabilities: {
            environment_monitoring: [
              {
                temperature: 30,
              },
            ],
          },
        },
      ],
    };

    (fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await fetchTemperatureData();

    expect(fetch).toHaveBeenCalledWith(mockBaseUrl + "/collector/resources/data/last", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        capabilities: ["environment_monitoring"],
      }),
    });

    expect(result).toEqual(mockResponse.resources);
  });

  it("should send command to air conditioner successfully", async () => {
    const mockBusActuators = [{ uuid: "uuid1" }, { uuid: "uuid2" }];

    const mockCommandData = [
      {
        uuid: "uuid1",
        capabilities: {
          air_control: "on",
        },
      },
      {
        uuid: "uuid2",
        capabilities: {
          air_control: "on",
        },
      },
    ];

    prismaMock.resource.findMany.mockResolvedValue(mockBusActuators as any);
    (fetch as jest.Mock).mockResolvedValue({});

    await sendCommandToAllAutomaticAirConditioners("on");

    expect(prismaMock.resource.findMany).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(mockBaseUrl + "/actuator/commands", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: mockCommandData }),
    });
  });

  it("should send command on to api successfully", async () => {
    const mockBusActuators = [{ uuid: "uuid1" }, { uuid: "uuid2" }];

    const mockCommandData = [
      {
        uuid: "uuid1",
        capabilities: {
          air_control: "on",
        },
      },
      {
        uuid: "uuid2",
        capabilities: {
          air_control: "on",
        },
      },
    ];

    prismaMock.resource.findMany.mockResolvedValue(mockBusActuators as any);
    (fetch as jest.Mock).mockResolvedValue({});

    await sendCommandToAllAutomaticAirConditioners("on");

    expect(prismaMock.resource.findMany).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(mockBaseUrl + "/actuator/commands", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: mockCommandData }),
    });
  });
});
