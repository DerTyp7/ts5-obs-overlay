import { IChannelInfos, IConnection, IChannel, IAuthMessage, IClientInfo, IClientMovedMessage, IClient, IClientPropertiesUpdatedMessage, ITalkStatusChangedMessage, IClientSelfPropertyUpdatedMessage, IServerPropertiesUpdatedMessage, IConnectStatusChangedMessage, IChannelsMessage, ITS5MessageHandler, ITS5DataHandler } from "@interfaces/teamspeak";

// Handle incoming messages from TS5 client
export class TS5MessageHandler implements ITS5MessageHandler {
  ws: WebSocket;
  dataHandler: ITS5DataHandler;

  setActiveConnectionStateId: React.Dispatch<React.SetStateAction<number>>;
  activeConnectionId = 0;

  constructor(ws: WebSocket, dataHandler: ITS5DataHandler, setActiveConnectionStateId: React.Dispatch<React.SetStateAction<number>>) {
    this.ws = ws;
    this.dataHandler = dataHandler;
    this.setActiveConnectionStateId = setActiveConnectionStateId;
  }

  setActiveConnection(connectionId: number) {
    this.activeConnectionId = connectionId;
    this.setActiveConnectionStateId(connectionId);
  }

  parseChannelInfos(channelInfos: IChannelInfos, connection: IConnection) {
    channelInfos.rootChannels.forEach((channel: IChannel) => {
      this.dataHandler.addChannel({ ...channel, connection: connection });

      if (channelInfos) {
        if (channelInfos.subChannels !== null && channel.id in channelInfos.subChannels) {
          channelInfos.subChannels[channel.id].forEach((subChannel: IChannel) => {
            this.dataHandler.addChannel({ ...subChannel, connection: connection });
          });
        }
      }
    });
  }

  // This message is sent by the TS5 server when the client is connected
  // It contains the initial data
  handleAuthMessage(data: IAuthMessage) {
    console.log("handleAuthMessage", data);

    localStorage.setItem("apiKey", data.payload.apiKey);

    // Process auth payload and add initial data
    data.payload.connections.forEach((connection: IConnection) => {
      this.dataHandler.addConnection(connection);

      // Add channels
      if (connection.channelInfos !== undefined) {
        this.parseChannelInfos(connection.channelInfos, connection);
      }

      // Add clients
      connection.clientInfos?.forEach((clientInfo: IClientInfo) => {
        const clientChannel: IChannel | undefined = this.dataHandler.getChannelById(clientInfo.channelId, connection.id);

        if (clientChannel !== undefined) {
          this.dataHandler.addClient({
            id: clientInfo.id,
            talkStatus: 0,
            channel: { ...clientChannel, connection: connection },
            properties: clientInfo.properties,
          });
        }
      });
    });
  }

  // This message is sent by the TS5 server when a client moves a channel OR joins/leaves the server
  handleClientMovedMessage(data: IClientMovedMessage) {
    console.log("handleClientMoved", data);

    const client: IClient | undefined = this.dataHandler.getClientById(data.payload.clientId, data.payload.connectionId);


    //* This gets called when we are connecting to the server and the new clients get loaded
    if (+data.payload.oldChannelId == 0) { // Create new client(when connecting to server)
      //set timout to wait for channels to be created
      setTimeout(() => {
        console.log("---> New Client created")
        const newChannel = this.dataHandler.getChannelById(data.payload.newChannelId, data.payload.connectionId);
        if (newChannel !== undefined) {
          this.dataHandler.addClient(
            {
              id: data.payload.clientId,
              talkStatus: 0,
              channel: newChannel,
              properties: data.payload.properties,
            });
        }
      }, 2000);
    } else {//* This gets called when a client moves a channel OR joins/leaves the server
      const newChannel: IChannel | undefined = this.dataHandler.getChannelById(data.payload.newChannelId, data.payload.connectionId);

      if (newChannel === undefined || newChannel.id === 0) {
        console.log("---> Client left")

        if (client !== undefined) {
          this.dataHandler.removeClient(client);

        }
        return;
      }

      if (client !== undefined) { // Client already exists

        // Client moved
        console.log("---> Client moved")

        this.dataHandler.updateClient({
          ...client,
          channel: newChannel,
        });

      } else { // Client does not exist
        // Client joined
        console.log("---> New Client joined")
        this.dataHandler.addClient(
          {
            id: data.payload.clientId,
            talkStatus: 0,
            channel: newChannel,
            properties: data.payload.properties,
          }
        );
      }
    }
  }

  handleClientPropertiesUpdatedMessage(data: IClientPropertiesUpdatedMessage) {
    console.log("handleClientPropertiesUpdate", data);

    const client: IClient | undefined = this.dataHandler.getClientById(data.payload.clientId, data.payload.connectionId);

    if (client !== undefined) {
      this.dataHandler.updateClient({
        ...client,
        properties: data.payload.properties,
      });
    }
  }

  handleTalkStatusChangedMessage(data: ITalkStatusChangedMessage) {
    console.log("handleTalkStatusChanged", data);

    const client: IClient | undefined = this.dataHandler.getClientById(data.payload.clientId, data.payload.connectionId);

    if (client !== undefined) {
      this.dataHandler.updateClient({
        ...client,
        talkStatus: data.payload.status,
      });
    }

    console.log(this.dataHandler.localConnections)
    console.log(this.dataHandler.localChannels)
    console.log(this.dataHandler.localClients)

  }
  handleClientSelfPropertyUpdatedMessage(data: IClientSelfPropertyUpdatedMessage) {
    console.log("handleClientSelfPropertyUpdated", data);

    const connection: IConnection | undefined = this.dataHandler.getConnectionById(this.activeConnectionId);

    if (data.payload.flag == "inputHardware" || connection == undefined) { // sadly thats the only way to detect if a server is active or not
      this.setActiveConnection(data.payload.connectionId);
    }
  }

  handleServerPropertiesUpdatedMessage(data: IServerPropertiesUpdatedMessage) {
    console.log("handleServerPropertiesUpdated", data);

    const connection: IConnection | undefined = this.dataHandler.getConnectionById(data.payload.connectionId);

    if (connection !== undefined) { // Update existing connection
      this.dataHandler.updateConnection({
        ...connection,
        properties: data.payload.properties,
      });
    }
  }

  handleConnectStatusChangedMessage(data: IConnectStatusChangedMessage) {
    console.log("handleConnectStatusChanged", data);

    if (data.payload.status === 0) { // Disconnected from server
      const connection: IConnection | undefined = this.dataHandler.getConnectionById(data.payload.connectionId);

      if (connection !== undefined) {
        this.dataHandler.removeConnection(connection);
      }
    }

    // Status 1-3 are the connection steps (connecting, authenticating, etc.) (i guess)

    if (data.payload.status === 4) { // Connected to server
      this.dataHandler.addConnection({
        id: data.payload.connectionId,
        clientId: data.payload.info.clientId,
      });
    }
  }

  handleChannelsMessage(data: IChannelsMessage) {
    console.log("handleChannels", data);

    // Wait a bit for the connection to be added
    setTimeout(() => {
      console.log(this.dataHandler.localConnections);
      console.log(data.payload.connectionId)
      console.log(this.dataHandler.localConnections.filter((connection: IConnection) => connection.id === data.payload.connectionId)[0]);
      console.log(this.dataHandler.localConnections.find((connection: IConnection) => connection.id === data.payload.connectionId));
      const connection: IConnection | undefined = this.dataHandler.getConnectionById(data.payload.connectionId);
      console.log(connection);
      if (connection !== undefined) {
        this.parseChannelInfos(data.payload.info, connection);
        console.log(data.payload.info)
      }
    }, 1000);
  }
}