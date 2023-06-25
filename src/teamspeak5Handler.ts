import { IAuthMessage, IAuthSenderPayload, IChannel, IChannelInfos, IChannelsMessage, IClient, IClientInfo, IClientMovedMessage, IClientPropertiesUpdatedMessage, IClientSelfPropertyUpdatedMessage, IConnectStatusChangedMessage, IConnection, IServerPropertiesUpdatedMessage, ITalkStatusChangedMessage } from "interfaces/teamspeak";


// Establish connection to TS5 client
// Main class
export class TS5Connection {
  ws: WebSocket; // Websocket connection to TS5 client
  dataHandler: TS5DataHandler; // Handles data/lists and states
  messageHandler: TS5MessageHandler; // Handles messages received from TS5 client

  constructor(
    // Port of TS5 client
    remoteAppPort: number,

    // State setters for dataHandler
    setConnections: React.Dispatch<React.SetStateAction<IConnection[]>>,
    setChannels: React.Dispatch<React.SetStateAction<IChannel[]>>,
    setClients: React.Dispatch<React.SetStateAction<IClient[]>>,
    setActiveConnectionId: React.Dispatch<React.SetStateAction<number>>,
  ) {
    // Create websocket connection to TS5 client
    this.ws = new WebSocket(`ws://localhost:${remoteAppPort}`);

    // Create dataHandler and messageHandler
    this.dataHandler = new TS5DataHandler(setConnections, setChannels, setClients);
    this.messageHandler = new TS5MessageHandler(this.ws, this.dataHandler, setActiveConnectionId);
  }


  // Connect to TS5 client
  connect() {
    console.log('Connecting to TS5 client...');

    // Create authentication payload
    const initalPayload: IAuthSenderPayload = {
      type: "auth",
      payload: {
        identifier: "de.tealfire.obs",
        version: "1.0.0",
        name: "TS5 OBS Overlay",
        description: "A OBS overlay for TS5 by DerTyp876",
        content: {
          apiKey: localStorage.getItem("apiKey") || "",
        },
      },
    };

    this.ws.onopen = () => {
      // Send authentication payload to TS5 client
      console.log("Sending auth payload...")
      this.ws.send(JSON.stringify(initalPayload));
    };

    // Handle messages received from TS5 client
    // See TS5MessageHandler class
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      console.log(data)

      switch (data.type) {
        case "auth":
          this.messageHandler.handleAuthMessage(data);
          break;
        case "clientMoved":
          this.messageHandler.handleClientMovedMessage(data);
          break;
        case "clientPropertiesUpdated":
          this.messageHandler.handleClientPropertiesUpdatedMessage(data);
          break;
        case "talkStatusChanged":
          this.messageHandler.handleTalkStatusChangedMessage(data);
          break;
        case "serverPropertiesUpdated":
          this.messageHandler.handleServerPropertiesUpdatedMessage(data);
          //this.ws.close();
          break;
        case "connectStatusChanged":
          this.messageHandler.handleConnectStatusChangedMessage(data);
          break;
        case "clientSelfPropertyUpdated":
          this.messageHandler.handleClientSelfPropertyUpdatedMessage(data);
          break;
        case "channels":
          this.messageHandler.handleChannelsMessage(data);
          break;
        default:
          console.log(`No handler for event type: ${data.type}`);
          break;
      }
    };
  }
}

class TS5DataHandler {
  // Local lists of connections, channels and clients
  // These lists are used to keep track of the data independent of the App.tsx state
  localConnections: IConnection[];
  localChannels: IChannel[];
  localClients: IClient[];

  // State setters for App.tsx
  setConnections: React.Dispatch<React.SetStateAction<IConnection[]>>;
  setChannels: React.Dispatch<React.SetStateAction<IChannel[]>>;
  setClients: React.Dispatch<React.SetStateAction<IClient[]>>;

  constructor(
    // State setters for App.tsx
    setConnections: React.Dispatch<React.SetStateAction<IConnection[]>>,
    setChannels: React.Dispatch<React.SetStateAction<IChannel[]>>,
    setClients: React.Dispatch<React.SetStateAction<IClient[]>>
  ) {
    this.setConnections = setConnections;
    this.setChannels = setChannels;
    this.setClients = setClients;

    this.localConnections = [];
    this.localChannels = [];
    this.localClients = [];
  }

  // Update App.tsx states
  private updateConnectionsState() {
    this.setConnections([...this.localConnections]);
  }

  private updateChannelsState() {
    this.setChannels([...this.localChannels]);
  }

  private updateClientsState() {
    this.setClients([...this.localClients]);
  }

  // Add data to local lists and update states
  addConnection(connection: IConnection) {
    console.log("Adding connection...", connection)

    const existingConnection: IConnection | undefined = this.localConnections.find((localConnection: IConnection) => localConnection.id === connection.id);

    if (existingConnection == undefined) {
      this.localConnections.push(connection);
      this.updateConnectionsState();
      console.log("Connection added")
    } else {
      console.log("Connection already exists")
    }
  }

  addChannel(channel: IChannel) {
    console.log("Adding channel...", channel)
    const existingChannel: IChannel | undefined = this.localChannels.find((localChannel: IChannel) => localChannel.id === channel.id && localChannel.connection.id === channel.connection.id);

    if (existingChannel == undefined) {
      this.localChannels.push(channel);
      this.updateChannelsState();
      console.log("Channel added")
    } else {
      console.log("Channel already exists")
    }
  }

  addClient(client: IClient) {
    console.log("Adding client...", client)
    const existingClient: IClient | undefined = this.localClients.find((localClient: IClient) => localClient.id === client.id && localClient.channel?.connection.id === client.channel?.connection.id);

    if (existingClient == undefined) {
      this.localClients.push(client);
      this.updateClientsState();
      console.log("Client added")
    } else {
      console.log("Client already exists")
    }
  }

  // Update data in local lists and update states
  updateConnection(connection: IConnection) {
    console.log("Updating connection...", connection)
    const existingConnection: IConnection | undefined = this.localConnections.find((localConnection: IConnection) => localConnection.id === connection.id);

    if (existingConnection !== undefined) {
      this.localConnections[this.localConnections.indexOf(existingConnection)] = connection;
      this.updateConnectionsState();
      console.log("Connection updated")
    } else {
      console.log("Connection does not exist")
    }
  }

  updateChannel(channel: IChannel) {
    console.log("Updating channel...", channel)
    const existingChannel: IChannel | undefined = this.localChannels.find((localChannel: IChannel) => localChannel.id === channel.id && localChannel.connection.id === channel.connection.id);

    if (existingChannel !== undefined) {
      this.localChannels[this.localChannels.indexOf(existingChannel)] = channel;
      this.updateChannelsState();
      console.log("Channel updated")
    } else {
      console.log("Channel does not exist")
    }
  }

  updateClient(client: IClient) {
    console.log("Updating client...", client)
    const existingClient: IClient | undefined = this.localClients.find((localClient: IClient) => localClient.id === client.id && localClient.channel?.connection.id === client.channel?.connection.id);

    if (existingClient !== undefined) {
      this.localClients[this.localClients.indexOf(existingClient)] = client;
      this.updateClientsState();
      console.log("Client updated")
    } else {
      console.log("Client does not exist")
    }
  }

  // Remove data from local lists and update states
  removeConnection(connection: IConnection) {
    console.log("Removing connection...", connection)
    const existingConnection: IConnection | undefined = this.localConnections.find((localConnection: IConnection) => localConnection.id === connection.id);

    if (existingConnection !== undefined) {
      this.localConnections.splice(this.localConnections.indexOf(existingConnection), 1);

      // Remove all channels and clients associated with the connection
      this.localChannels = this.localChannels.filter((localChannel: IChannel) => localChannel.connection.id !== connection.id);
      this.localClients = this.localClients.filter((localClient: IClient) => localClient.channel?.connection.id !== connection.id);

      this.updateChannelsState();
      this.updateClientsState();
      this.updateConnectionsState();
      console.log("Connection removed")
    } else {
      console.log("Connection does not exist")
    }
  }

  removeChannel(channel: IChannel) {
    console.log("Removing channel...", channel)
    const existingChannel: IChannel | undefined = this.localChannels.find((localChannel: IChannel) => localChannel.id === channel.id && localChannel.connection.id === channel.connection.id);

    if (existingChannel !== undefined) {
      this.localChannels.splice(this.localChannels.indexOf(existingChannel), 1);

      // Remove all clients associated with the channel
      this.localClients = this.localClients.filter((localClient: IClient) => localClient.channel?.id !== channel.id);

      this.updateClientsState();
      this.updateChannelsState();
      console.log("Channel removed")
    } else {
      console.log("Channel does not exist")
    }
  }

  removeClient(client: IClient) {
    console.log("Removing client...", client)
    const existingClient: IClient | undefined = this.localClients.find((localClient: IClient) => localClient.id === client.id && localClient.channel?.connection.id === client.channel?.connection.id);

    if (existingClient !== undefined) {
      this.localClients.splice(this.localClients.indexOf(existingClient), 1);
      this.updateClientsState();
      console.log("Client removed")
    } else {
      console.log("Client does not exist")
    }
  }

  // Helper functions
  getConnectionById(id: number): IConnection | undefined {
    return this.localConnections.find((connection: IConnection) => connection.id === id);
  }

  getChannelById(id: number, connectionId: number): IChannel | undefined {
    return this.localChannels.find((channel: IChannel) => channel.id === id && channel.connection?.id === connectionId);
  }

  getClientById(id: number, connectionId: number): IClient | undefined {
    return this.localClients.find((client: IClient) => client.id === id && client.channel?.connection.id === connectionId);
  }



}

// Handle incoming messages from TS5 client
class TS5MessageHandler {
  ws: WebSocket;
  dataHandler: TS5DataHandler;

  setActiveConnectionId: React.Dispatch<React.SetStateAction<number>>;

  constructor(ws: WebSocket, dataHandler: TS5DataHandler, setActiveConnectionId: React.Dispatch<React.SetStateAction<number>>) {
    this.ws = ws;
    this.dataHandler = dataHandler;
    this.setActiveConnectionId = setActiveConnectionId;
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
    this.setActiveConnectionId(data.payload.connectionId);
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
