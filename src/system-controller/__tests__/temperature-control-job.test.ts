import { controlAirConditioner } from "../jobs/temperature-control";
import { sendCommandToAllAutomaticAirConditioners } from "../services/api";
import { calculateAverageTemperature } from "../utils/temperature";

jest.mock("../utils/temperature", () => ({
  calculateAverageTemperature: jest.fn(),
}));

jest.mock("../services/api", () => ({
  fetchTemperatureData: jest.fn(),
  sendCommandToAirConditioner: jest.fn(),
  sendCommandToAllAutomaticAirConditioners: jest.fn(),
}));

jest.mock("../config/consts", () => ({
  consts: {
    maxTemperature: 22,
    currentTemperature: 0,
  },
}));

describe("TemperatureControlJob", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should turn on the air conditioning when the temperature is above 22 degrees", async () => {
    const mockAverageTemperature = 23;

    (calculateAverageTemperature as jest.Mock).mockReturnValue(mockAverageTemperature);

    await controlAirConditioner();

    expect(sendCommandToAllAutomaticAirConditioners).toHaveBeenCalledWith("on");
  });

  it("should not turn off the air conditioning when the temperature is above 22 degrees", async () => {
    const mockAverageTemperature = 23;

    (calculateAverageTemperature as jest.Mock).mockReturnValue(mockAverageTemperature);

    await controlAirConditioner();

    expect(sendCommandToAllAutomaticAirConditioners).not.toHaveBeenCalledWith("off");
  });

  it("should turn off the air conditioning when the temperature is below or equals to 22 degrees", async () => {
    const mockAverageTemperature = 22;

    (calculateAverageTemperature as jest.Mock).mockReturnValue(mockAverageTemperature);

    await controlAirConditioner();

    expect(sendCommandToAllAutomaticAirConditioners).toHaveBeenCalledWith("off");
  });

  it("should not turn on the air conditioning when the temperature is below or equals to 22 degrees", async () => {
    const mockAverageTemperature = 22;

    (calculateAverageTemperature as jest.Mock).mockReturnValue(mockAverageTemperature);

    await controlAirConditioner();

    expect(sendCommandToAllAutomaticAirConditioners).not.toHaveBeenCalledWith("on");
  });
});
