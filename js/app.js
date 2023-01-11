function main() {
  const ws = new WebSocket(`ws://localhost:${CONFIG.remoteAppPort}`);
  const paylaod = {
    type: "auth",
    payload: {
      identifier: "de.tealfire.obs",
      version: "0.0.1",
      name: "TS5 OBS Overlay",
      description: "A simple OBS overlay for TS5 by DerTyp876",
      content: {
        apiKey: apiKey,
      },
    },
  };

  clientList.clear();
  channelList.clear();
  selfClient = null;

  ws.onopen = (event) => {
    // Send payload to TS5 client
    ws.send(JSON.stringify(paylaod));
  };

  ws.onmessage = (event) => {
    let data = JSON.parse(event.data);
    // console.log(data);
    switch (data.type) {
      case "auth":
        handleAuthMessage(data);
        apiKey = data.payload.apiKey;
        break;
      case "clientMoved":
        handleClientMoved(data);
        break;
      case "clientPropertiesUpdated":
        handleClientPropertiesUpdate(data);
        break;
      case "talkStatusChanged":
        handleTalkStatusChanged(data);
        break;
      case "serverPropertiesUpdated":
        ws.close();
      default:
        console.log(`No handler for event type: ${data.type}`);
        break;
    }

    // Draw clientList in HTML object
    drawClients();
  };

  ws.onerror = (err) => {
    console.log(err);
    ws.close();
    return;
  };

  ws.onclose = (event) => {
    console.log("Disconnected");
    clientList.clear();
    channelList.clear();
    drawClients();
    main(); // Reconnected
  };
}
main();
