function drawClients() {
  let elem = document.getElementById("content");

  result = "";
  getClientsInChannel(thisClient.channel).forEach((c) => {
    result += `<div style="color:${CONFIG.style.fontColor}; font-size:${CONFIG.style.fontSize}">`;
    result += '<div class="content-img">';
    if (c.outputMuted) {
      result += '	<img src="img/muted_output.svg" />';
    } else if (c.inputMuted) {
      result += '	<img src="img/muted_input.svg" />';
    } else if (c.talkStatus == 1) {
      result += '	<img src="img/on.svg" />';
    } else {
      result += '	<img src="img/off.svg" />';
    }
    result += "</div>";
    result += `<div class="content-text"
		 style="-webkit-text-stroke:${CONFIG.style.fontStrokeSize} ${CONFIG.style.fontStrokeColor};
		"><p style="background:${CONFIG.style.fontBackground};">${c.name}</p></div></div>`;
  });
  elem.innerHTML = result;
}
