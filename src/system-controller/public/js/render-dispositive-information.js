import { fetchBusInformation } from "./interscity.js";

export const renderDispositiveInformation = async (id) => {
  window.currentBus = id;
  const divInformation = document.getElementById("dispositive-information");

  const { air_activated: activated, air_mode: mode } = await fetchBusInformation(id);

  const fragment = `<div>
    <img src="assets/bus-air-${
      activated ? "enabled" : "disabled"
    }.png" width="250px" height="250px" />
    <p>Bus ID: ${id}</p>
    <p> Ar Condicionado ${activated ? "Ativado" : "Desativado"}</p>
    <p> Modo de operação: ${mode == "AUTOMATIC" ? "Automático 🔄" : "Manual ⚙️"}</p>
    <div id="bus-buttons">
        <button id="enable-air-button">Ligar Ar Condicionado</button>
        <button id="disable-air-button">Desligar Ar Condicionado</button>
        <button id="bus-mode-button">Mudar Modo de Operação</button>
    </div>
  </div>
  `;

  divInformation.innerHTML = fragment;

  handleButtons(id);
};

const handleButtons = (id) => {
  const disableAirButton = document.getElementById("disable-air-button");
  const enableAirButton = document.getElementById("enable-air-button");
  const busModeButton = document.getElementById("bus-mode-button");

  disableAirButton.addEventListener("click", async () => {
    await fetch(`/command`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        command: "off",
        uuids: [id],
      }),
    });

    addAwaitToButton(disableAirButton);
  });

  enableAirButton.addEventListener("click", async () => {
    await fetch(`/command`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        command: "on",
        uuids: [id],
      }),
    });

    addAwaitToButton(enableAirButton);
  });

  busModeButton.addEventListener("click", async () => {
    await fetch(`/command`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        command: "change_mode",
        uuids: [id],
      }),
    });

    addAwaitToButton(busModeButton);
  });

  const addAwaitToButton = (button) => {
    button.disabled = true;
    button.innerHTML = "Aguarde...";
  };
};
