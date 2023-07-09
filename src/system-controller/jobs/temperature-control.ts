import { scheduleJob } from "node-schedule";
import { fetchTemperatureData, sendCommandToAirConditioner } from "../services/api";
import { calculateAverageTemperature } from "../utils/temperature";

const maxTemperature = 22;

export async function controlAirConditioner() {
  const data = await fetchTemperatureData();
  const averageTemperature = calculateAverageTemperature(data);

  if (averageTemperature > maxTemperature) {
    await sendCommandToAirConditioner("on");
  } else {
    await sendCommandToAirConditioner("off");
  }
}
