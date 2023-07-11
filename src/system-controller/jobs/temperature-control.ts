import { fetchTemperatureData, sendCommandToAllAutomaticAirConditioners } from "../services/api";
import { calculateAverageTemperature } from "../utils/temperature";
import { scheduleJob } from "node-schedule";
import { consts } from "../config/consts";

export async function controlAirConditioner() {
  const data = await fetchTemperatureData();
  const averageTemperature = calculateAverageTemperature(data);

  consts.currentTemperature = averageTemperature;

  if (averageTemperature > consts.maxTemperature) {
    await sendCommandToAllAutomaticAirConditioners("bus_monitoring", "on");
  } else {
    await sendCommandToAllAutomaticAirConditioners("bus_monitoring", "off");
  }

  if (averageTemperature > consts.maxTemperature - 3) {
    await sendCommandToAllAutomaticAirConditioners("train_monitoring", "on");
    await sendCommandToAllAutomaticAirConditioners("room_monitoring", "on");
  } else {
    await sendCommandToAllAutomaticAirConditioners("train_monitoring", "off");
    await sendCommandToAllAutomaticAirConditioners("room_monitoring", "off");
  }
}

export const runControlAirConditionerJob = () => {
  scheduleJob("*/30 * * * * *", controlAirConditioner);
};
