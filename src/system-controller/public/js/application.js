import {
  matchTypeToImage,
  renderDispositiveInformation,
} from "./render-dispositive-information.js";
import { fetchResourceMonitoring, handleResourceInformation } from "./interscity.js";
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

  await processResources();
  runBusMonitoring();
}

async function processResources() {
  const resourcesInformations = await fetchResourceMonitoring();

  for (const busInformation of resourcesInformations) {
    const information = handleResourceInformation(busInformation);
    if (markers[busInformation.uuid]) {
      const marker = markers[busInformation.uuid];

      marker.setPosition(
        new google.maps.LatLng(information.location.lat, information.location.lon)
      );

      marker.setIcon({
        url: `assets/${matchTypeToImage(information.type)}-air-${
          information.air_activated ? "enabled" : "disabled"
        }.png`,
        scaledSize: new google.maps.Size(35, 35),
      });
    } else {
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(information.location.lat, information.location.lon),
        map: map,
        icon: {
          url: `assets/${matchTypeToImage(information.type)}-air-${
            information.air_activated ? "enabled" : "disabled"
          }.png`,
          scaledSize: new google.maps.Size(35, 35),
        },
      });
      marker.addListener("click", renderDispositiveInformation.bind(null, busInformation.uuid));
      markers[busInformation.uuid] = marker;
    }
  }

  if (window.currentResource) {
    renderDispositiveInformation(currentResource);
  }
}

function runBusMonitoring() {
  setInterval(async () => {
    await processResources();
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
