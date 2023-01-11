// Handle the auth message event which is send by the client to init the session
// The clients send therefore all channels and clients to us
function handleAuthMessage(data) {
  // Set channels and clients
  channelList.setItems(parseChannelInfos(data.payload.connections[0].channelInfos));
  clientList.setItems(parseClientInfos(data.payload.connections[0].clientInfos));

  // The client of this current user
  selfClient = clientList.getById(data.payload.connections[0].clientId);
}

// Handle the event when a client moved to another place/channel
// Also includes disconnecting and connecting of clients
function handleClientMoved(data) {
  // Get our client object based on the target client id of this event
  // This can be null if the client does not exist in our list (newly joined)
  const client = clientList.getById(data.payload.clientId);

  if (data.payload.newChannelId == 0) {
    // If newChannelId is 0, the client left the server
    // Client disconnected
    if (client) {
      console.log(`${client.name} disconnected`);
      clientList.remove(client); // Remove disconnected client from clientList
    }

    // If the disconnected client is the current user
    if (data.payload.clientId == selfClient.id) {
      //* NOTE: since this app does support multiple servers yet, we expect the user to be connected to NO servers at this point
      console.log("You disconnected");
      clientList.clear(); // remove all clients.
      channelList.clear();
    }
  } else {
    // Client switched the channel OR JOINED the server to a channel
    if (client) {
      // Client just switched the channel
      // Like described at the const client declaration, the client is not null therefore he already existed in our list/server
      client.channel = channelList.getById(data.payload.newChannelId);
    } else {
      // Client joined the server
      // Like described at the const client declaration, the client is null he is NEW in our list/server
      clientList.add(
        new Client(
          data.payload.clientId,
          channelList.getById(data.payload.newChannelId),
          data.payload.properties.nickname
        )
      );
    }
  }
}

// Handle the event where a client updates his properties (e.g. name, muteStatus)
function handleClientPropertiesUpdate(data) {
  // Get our client object based on the target client id of this event
  // This can be null if the client does not exist in our list
  const client = clientList.getById(data.payload.clientId);

  if (data.payload.properties.channelGroupInheritedChannelId == 0) {
    if (client) {
      clientList.remove(client);
    }
  } else {
    if (client) {
      // Update client properties

      // Other to the handleClientMoved function this handleClientPropertiesUpdate function also gets called
      // if anything at all happend to the client, so we update the channel here to be sure we dont miss anything
      client.channel = channelList.getById(data.payload.properties.channelGroupInheritedChannelId);

      client.name = data.payload.properties.nickname;
      client.inputMuted = data.payload.properties.inputMuted;
      client.outputMuted = data.payload.properties.outputMuted;
    } else {
      // For some reason the client did not exist in our list. Add client, to prevent further errors.
      clientList.add(
        new Client(
          data.payload.clientId,
          channelList.getById(data.payload.properties.channelGroupInheritedChannelId),
          data.payload.properties.nickname,
          data.payload.properies.inputMuted,
          data.payload.properies.outputMuted
        )
      );
    }
  }
}

// Gets called when a client starts talking
//* NOTE: If the "current self-user" is speaking but muted, this will still be called. This does not apply to foreign clients
function handleTalkStatusChanged(data) {
  let client = clientList.getById(data.payload.clientId);
  if (client) {
    client.talkStatus = data.payload.status;
  }
}
