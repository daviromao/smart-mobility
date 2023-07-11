const baseUrl = "http://10.10.10.104:8000";

export const fetchResourceMonitoring = async () => {
  const response = await fetch(`${baseUrl}/collector/resources/data/last`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      capabilities: ["bus_monitoring", "room_monitoring", "train_monitoring"],
    }),
  });

  const data = await response.json();
  return data.resources;
};

export const fetchResourceInformation = async (id) => {
  const response = await fetch(`${baseUrl}/collector/resources/${id}/data/last`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return handleResourceInformation(data.resources[0]);
};

export const disableAirConditioning = async (id) => {
  return data;
};

export const handleResourceInformation = (resource) => {
  if (resource.capabilities.bus_monitoring) {
    return resource.capabilities.bus_monitoring[0];
  } else if (resource.capabilities.room_monitoring) {
    return resource.capabilities.room_monitoring[0];
  } else if (resource.capabilities.train_monitoring) {
    return resource.capabilities.train_monitoring[0];
  }
};
