// Main entry point
function main() {
  let authenticated = false; // using this bool to determine if an user is already authenticated

  // Reset variables. Important so that the app can easly restart or reconnected.
  clientList.clear();
  channelList.clear();
  selfClient = null;

  // Initiliaze websocket connection to TS5 client
  const ws = new WebSocket(`ws://localhost:${CONFIG.remoteAppPort}`);
  const initalPayload = {
    type: "auth",
    payload: {
      identifier: "de.tealfire.obs",
      version: "0.1.9",
      name: "TS5 OBS Overlay",
      description: "A simple OBS overlay for TS5 by DerTyp876",
      content: {
        apiKey: localStorage.getItem("apiKey") ?? "",
      },
    },
  };

  ws.onopen = () => {
    // Send authentication payload to TS5 client
    ws.send(JSON.stringify(initalPayload));
  };

  // Handle websockets
  ws.onmessage = (event) => {
    let data = JSON.parse(event.data);
    console.log(data);
    switch (data.type) {
      case "auth":
        handleAuthMessage(data);
        localStorage.setItem("apiKey", data.payload.apiKey);
        authenticated = true;
        //console.log(apiKey);
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
    // Need to check if the connection got closed while the user was connected.
    // Because TS does not return a proper authentication error.
    // closed and not authenticated -> auth error or ts5 restarted/closed
    // closed and authenticated -> no auth error, app/obs was just closed by user
    if (authenticated == false) {
      localStorage.setItem("apiKey", "");
    }

    console.log(event);
    console.log("Disconnected");

    // Since the user disconnected, we need to clear all clients and channel
    clientList.clear();
    channelList.clear();

    drawClients(); // Redraw overlay to remove all clients
    main(); // Reconnected
  };
}
main();
