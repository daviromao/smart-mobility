import { renderDispositiveInformation } from "./render-dispositive-information.js";
import { fetchBusMonitoring } from "./interscity.js";
import { updateTemperatureInfo } from "./utils.js";

let saoCarlos,
  map,
  markers = {};

async function initMap() {
  saoCarlos = new google.maps.LatLng(-22.0154, -47.8911);

  map = new google.maps.Map(document.getElementById("map"), {
    center: saoCarlos,
    zoom: 14,
    mapId: "7b085051480c8950",
    disableDefaultUI: true,
    zoomControl: true,
  });

  const centerControlDiv = document.createElement("div");

  const centerControl = createCenterControl(map);

  centerControlDiv.appendChild(centerControl);

  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(centerControlDiv);

  await processBus();
  runBusMonitoring();
}

async function processBus() {
  const busInformations = await fetchBusMonitoring();

  for (const busInformation of busInformations) {
    const information = busInformation.capabilities.bus_monitoring[0];
    if (markers[busInformation.uuid]) {
      const marker = markers[busInformation.uuid];

      marker.setPosition(
        new google.maps.LatLng(information.location.lat, information.location.lon)
      );

      marker.setIcon({
        url: information.air_activated
          ? "assets/bus-air-enabled.png"
          : "assets/bus-air-disabled.png",
        scaledSize: new google.maps.Size(35, 35),
      });
    } else {
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(information.location.lat, information.location.lon),
        map: map,
        icon: {
          url: information.air_activated
            ? "assets/bus-air-enabled.png"
            : "assets/bus-air-disabled.png",
          scaledSize: new google.maps.Size(35, 35),
        },
      });
      marker.addListener("click", renderDispositiveInformation.bind(null, busInformation.uuid));
      markers[busInformation.uuid] = marker;
    }
  }

  if (window.currentBus) {
    renderDispositiveInformation(currentBus);
  }
}

function runBusMonitoring() {
  setInterval(async () => {
    await processBus();
  }, 4000);
}

function createCenterControl(map) {
  const controlButton = document.createElement("button");

  controlButton.classList.add("home-button");
  controlButton.innerHTML = `<i class="fas fa-home"></i>`;
  controlButton.title = "Click to recenter the map";
  controlButton.type = "button";

  // Setup the click event listeners: simply set the map to saoCarlos.
  controlButton.addEventListener("click", () => {
    map.setCenter(saoCarlos);
    map.setZoom(14);
  });

  return controlButton;
}

setInterval(updateTemperatureInfo, 5000);
window.initMap = initMap;
