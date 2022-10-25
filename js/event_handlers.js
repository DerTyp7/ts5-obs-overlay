function handleAuthMessage(data) {
	console.log("Handling auth message");
	channels = parseChannelInfos(data.payload.connections[0].channelInfos);
	clients = parseClientInfos(data.payload.connections[0].clientInfos);
	thisClient = clients.filter((obj) => {
		return obj.id === data.payload.connections[0].clientId;
	})[0];
}

function handleClientMoved(data) {
	const client = clients.filter((obj) => {
		return obj.id === data.payload.clientId;
	})[0];

	if (data.payload.newChannelId == 0) {
		// User disconnected
		if (client) {
			console.log(`${client.name} disconnected`);
			clients.splice(clients.indexOf(client), 1);
		}
		if (data.payload.clientId == thisClient.id) {
			console.log("You disconnected");
			clients = [];
			//! Maybe handle channel list here too
		}
	} else {
		// User moved channel
		if (client) {
			// Client already exists in list
			clients.filter((obj) => {
				return obj.id === data.payload.clientId;
			})[0].channel = channels.filter((obj) => {
				return obj.id === data.payload.newChannelId;
			})[0];
		} else {
			// New Client has to be created
			clients.push(
				new Client(
					data.payload.clientId,
					channels.filter((obj) => {
						return obj.id === data.payload.newChannelId;
					})[0],
					data.payload.properties.nickname
				)
			);
		}
	}
}

function handleClientPropertiesUpdate(data) {
	let client = clients.filter((obj) => {
		return obj.id === data.payload.clientId;
	})[0];
	if (data.payload.properties.channelGroupInheritedChannelId == 0) {
		if (client) {
			clients.splice(clients.indexOf(client), 1);
		}
	} else {
		if (client) {
			client.channel = channels.filter((obj) => {
				return (
					obj.id === data.payload.properties.channelGroupInheritedChannelId
				);
			})[0];

			client.name = data.payload.properties.nickname;
			client.inputMuted = data.payload.properties.inputMuted;
			client.outputMuted = data.payload.properties.outputMuted;
		} else {
			clients.push(
				new Client(
					data.payload.clientId,
					channels.filter((obj) => {
						return (
							obj.id === data.payload.properties.channelGroupInheritedChannelId
						);
					})[0],
					data.payload.properties.nickname,
					data.payload.properies.inputMuted,
					data.payload.properies.outputMuted
				)
			);
		}
	}
}

function handleTalkStatusChanged(data) {
	let client = clients.filter((obj) => {
		return obj.id === data.payload.clientId;
	})[0];
	if (client) {
		client.talkStatus = data.payload.status;
	}
}
