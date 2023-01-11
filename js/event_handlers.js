function handleAuthMessage(data) {
  channelList.setItems(
    parseChannelInfos(data.payload.connections[0].channelInfos)
  );
  clientList.setItems(
    parseClientInfos(data.payload.connections[0].clientInfos)
  );
  thisClient = clientList.getById(data.payload.connections[0].clientId);

  selfClient = data.payload.connections[0].clientInfos.find((client) => client.id == data.payload.connections[0].clientId);
}

function handleClientMoved(data) {
  const client = clientList.getById(data.payload.clientId);

  if (data.payload.newChannelId == 0) {
    // User disconnected
    if (client) {
      console.log(`${client.name} disconnected`);
      clientList.remove(client);
    }
    if (data.payload.clientId == thisClient.id) {
      console.log("You disconnected");
      clientList.clear();
    }
  } else {
    // User moved channel
    if (client) {
      // Client already exists in list
      clientList.getById(data.payload.clientId).channel = channelList.getById(
        data.payload.newChannelId
      );
    } else {
      console.log(data.payload);
      // New Client has to be created
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

function handleClientPropertiesUpdate(data) {
  let client = clientList.getById(data.payload.clientId);
  if (data.payload.properties.channelGroupInheritedChannelId == 0) {
    if (client) {
      clientList.remove(client);
    }
  } else {
    if (client) {
      client.channel = channelList.getById(
        data.payload.properties.channelGroupInheritedChannelId
      );

      client.name = data.payload.properties.nickname;
      client.inputMuted = data.payload.properties.inputMuted;
      client.outputMuted = data.payload.properties.outputMuted;
    } else {
      clientList.add(
        new Client(
          data.payload.clientId,
          channelList.getById(
            data.payload.properties.channelGroupInheritedChannelId
          ),
          data.payload.properties.nickname,
          data.payload.properies.inputMuted,
          data.payload.properies.outputMuted
        )
      );
    }
  }
}

function handleTalkStatusChanged(data) {
  let client = clientList.getById(data.payload.clientId);
  if (client) {
    client.talkStatus = data.payload.status;
  }
}
