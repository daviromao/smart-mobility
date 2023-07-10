export const updateTemperatureInfo = async () => {
  const temperatureInfo = document.getElementById("temperature-info");
  const result = await fetch("/monitor/temperature");
  const temperatureValue = await result.json();
  temperatureInfo.innerHTML = temperatureValue + "°C";
};
