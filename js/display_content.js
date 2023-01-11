// Draw clients in the overlay
// Gets called everytime an event has been received (app.js -> ws.onmessage)
function drawClients() {
  const overlayContent = document.getElementById("content");

  let result = "";
  if (selfClient) {
    // Loop through all clients which are currently in your channel
    getClientsInChannel(selfClient.channel).forEach((c) => {
      // Open client div
      result += `<div class="client-div" ${c.isHidden() ? "hidden" : ""} style="color:${
        CONFIG.style.fontColor
      }; font-size:${CONFIG.style.fontSize}">`;

      // Add image
      result += '<div class="client-img-div">';
      if (c.outputMuted) {
        result += '	<img src="img/muted_output.svg" />';
      } else if (c.inputMuted) {
        result += '	<img src="img/muted_input.svg" />';
      } else if (c.talkStatus == 1) {
        result += '	<img src="img/on.svg" />';
      } else {
        result += '	<img src="img/off.svg" />';
      }

      // Close client div
      result += "</div>";

      // Add client text (name of the client)
      result += `<div class="client-text-div"
			 style="-webkit-text-stroke:${CONFIG.style.fontStrokeSize} ${CONFIG.style.fontStrokeColor};
			"><p style="background:${CONFIG.style.fontBackground};">${c.name}</p></div></div>`;
    });
  }

  overlayContent.innerHTML = result;
}
