import { fetchTemperatureData, sendCommandToAllAutomaticAirConditioners } from "../services/api";
import { calculateAverageTemperature } from "../utils/temperature";
import { scheduleJob } from "node-schedule";
import { consts } from "../config/consts";

export async function controlAirConditioner() {
  const data = await fetchTemperatureData();
  const averageTemperature = calculateAverageTemperature(data);

  consts.currentTemperature = averageTemperature;

  if (averageTemperature > consts.maxTemperature) {
    await sendCommandToAllAutomaticAirConditioners("on");
  } else {
    await sendCommandToAllAutomaticAirConditioners("off");
  }
}

export const runControlAirConditionerJob = () => {
  scheduleJob("*/30 * * * * *", controlAirConditioner);
};
