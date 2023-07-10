const baseUrl = "http://10.10.10.104:8000";

export const fetchBusMonitoring = async () => {
  const response = await fetch(`${baseUrl}/collector/resources/data/last`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      capabilities: ["bus_monitoring"],
    }),
  });

  const data = await response.json();
  return data.resources;
};

export const fetchBusInformation = async (id) => {
  const response = await fetch(`${baseUrl}/collector/resources/${id}/data/last`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      capabilities: ["bus_monitoring"],
    }),
  });

  const data = await response.json();

  return data.resources[0].capabilities.bus_monitoring[0];
};

export const disableAirConditioning = async (id) => {
  return data;
};
