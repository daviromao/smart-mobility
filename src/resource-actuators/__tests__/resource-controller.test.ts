import { Request, Response } from "express";
import {
  getResourceByUuid,
  turnOnAirConditioner,
  turnOffAirConditioner,
} from "../services/resource-service";

import { resourceCallback } from "../controllers/resource-controller";

const mockRequest = (params: any, body: any): Request =>
  ({
    params,
    body,
  } as Request);

const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

jest.mock("../services/resource-service", () => ({
  getResourceByUuid: jest.fn(),
  turnOnAirConditioner: jest.fn(),
  turnOffAirConditioner: jest.fn(),
}));

describe("resourceCallback", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 404 if resource is not found", async () => {
    const req = mockRequest({ uuid: "uuid1" }, {});
    const res = mockResponse();

    (getResourceByUuid as jest.Mock).mockResolvedValue(null);

    await resourceCallback(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Bus not found" });
  });

  it("should turn on the air conditioning and return 200", async () => {
    const req = mockRequest(
      { uuid: "uuid1" },
      { command: { capability: "air_control", value: "on" } }
    );
    const res = mockResponse();

    (getResourceByUuid as jest.Mock).mockResolvedValue({});

    await resourceCallback(req, res);

    expect(turnOnAirConditioner).toHaveBeenCalledWith("uuid1");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Air conditioning turned on",
    });
  });

  it("should turn off the air conditioning and return 200", async () => {
    const req = mockRequest(
      { uuid: "uuid1" },
      { command: { capability: "air_control", value: "off" } }
    );
    const res = mockResponse();

    (getResourceByUuid as jest.Mock).mockResolvedValue({});

    await resourceCallback(req, res);

    expect(turnOffAirConditioner).toHaveBeenCalledWith("uuid1");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Air conditioning turned off",
    });
  });

  it("should return 400 for invalid value", async () => {
    const req = mockRequest(
      { uuid: "uuid1" },
      { command: { capability: "air_control", value: "invalid" } }
    );
    const res = mockResponse();

    (getResourceByUuid as jest.Mock).mockResolvedValue({});

    await resourceCallback(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid value" });
  });

  it("should return 400 for invalid capability", async () => {
    const req = mockRequest(
      { uuid: "uuid1" },
      { command: { capability: "invalid", value: "on" } }
    );

    const res = mockResponse();

    (getResourceByUuid as jest.Mock).mockResolvedValue({});

    await resourceCallback(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid capability" });
  });

  it("should return 400 for empty body", async () => {
    const req = mockRequest({ uuid: "uuid1" }, {});

    const res = mockResponse();

    (getResourceByUuid as jest.Mock).mockResolvedValue({});

    await resourceCallback(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("should not call turn on or turn off if body is wrong", async () => {
    const req = mockRequest(
      { uuid: "uuid1" },
      { command: { capability: "wrong", value: "wrong" } }
    );
    const res = mockResponse();

    (getResourceByUuid as jest.Mock).mockResolvedValue({});

    await resourceCallback(req, res);

    expect(turnOnAirConditioner).not.toHaveBeenCalled();
    expect(turnOffAirConditioner).not.toHaveBeenCalled();
  });
});
