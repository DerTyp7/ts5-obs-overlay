function connectToTeamSpeak() {
	const ws = new WebSocket("ws://localhost:5899");
	const paylaod = {
		type: "auth",
		payload: {
			identifier: "de.tealfire.obs",
			version: "0.0.1",
			name: "TS5 OBS Overlay",
			description: "A simple OBS overlay for TS5 by DerTyp876",
			content: {
				apiKey: "b02b521c-68bb-4971-a8d2-3f9f94b44d73",
			},
		},
	};

	ws.onopen = (event) => {
		ws.send("Connected to TeamSpeak5");
		ws.send(JSON.stringify(paylaod));
	};

	ws.onmessage = (event) => {
		let data = JSON.parse(event.data);
		//console.log(data);

		switch (data.type) {
			case "auth":
				handleAuthMessage(data);
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
			default:
				console.log(`No handler for event type: ${data.type}`);
				break;
		}
		drawClients();
		console.log(clients);
		//console.log(channels);
	};

	ws.onerror = (err) => {
		console.error(err);
		connectToTeamSpeak();
	};

	ws.onclose = (event) => {
		console.log("Disconnected: " + event.reason);
		connectToTeamSpeak();
	};
}
connectToTeamSpeak();
