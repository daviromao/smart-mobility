import { ResourceDataResponse } from "../interfaces/resource-data-response";

export function calculateAverageTemperature(sensorDatas: ResourceDataResponse[]) {
  const temperatures = sensorDatas.map((sensorData) => {
    return sensorData.capabilities.environment_monitoring[0].temperature;
  });

  const averageTemperature = temperatures.reduce((a, b) => a + b) / temperatures.length;

  return averageTemperature;
}
