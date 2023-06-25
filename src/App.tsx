/* eslint-disable react-hooks/exhaustive-deps */
import "@styles/App.scss";
import { TS5Connection } from "./teamspeak5Handler";
import { IChannel, IClient, IConnection } from "interfaces/teamspeak";
import { useEffect, useState } from "react";
import Viewer from "./Viewer";

export default function App() {
  const [clients, setClients] = useState<IClient[]>([]);
  const [channels, setChannels] = useState<IChannel[]>([]);
  const [connections, setConnections] = useState<IConnection[]>([]);
  const [activeConnectionId, setActiveConnectionId] = useState<number>(1);

  const [currentConnection, setCurrentConnection] = useState<IConnection | undefined>(undefined);
  const [currentChannel, setCurrentChannel] = useState<IChannel | undefined>(undefined);
  const [currentClient, setCurrentClient] = useState<IClient | undefined>(undefined);

  function setCurrentStates() {
    const currentConnection = connections.find((connection) => connection.id === activeConnectionId);
    setCurrentConnection(currentConnection);

    if (currentConnection) {
      const currentClient = clients.find((client) => client.id === currentConnection.clientId);
      setCurrentClient(currentClient);
      if (currentClient) {
        const currentChannel = channels.find((channel) => channel.id === currentClient.channel?.id);
        setCurrentChannel(currentChannel);
        if (currentChannel) {
          return currentChannel;
        }
      }
    }
  }

  useEffect(() => {
    const tsConnection: TS5Connection = new TS5Connection(
      5899,
      setConnections,
      setChannels,
      setClients,
      setActiveConnectionId
    );
    tsConnection.connect();
  }, []);

  useEffect(() => {
    console.log("====================================");
    setCurrentStates();
  }, [clients, channels, connections, activeConnectionId]);

  return (
    <div className="App">
      {activeConnectionId}
      <Viewer
        clients={
          clients.map((client) => {
            if (client.channel?.id === currentChannel?.id) {
              return client;
            }
          }) as IClient[]
        }
        channel={currentChannel}
      />
      <div className="list">
        <h1>Channels {channels.length}</h1>
        {channels.map((channel) => (
          <div key={`${channel.id}-${channel.connection?.id}`}>
            <p>
              <b>
                {channel.id} {channel.properties.name}
              </b>
            </p>
            <hr />
            {clients.map((client) => {
              if (client.channel?.id === channel.id) {
                return (
                  <p key={`${client.id}-${client.channel?.connection.id}`}>
                    {client.id} {client.properties.nickname}
                  </p>
                );
              }
            })}
          </div>
        ))}
      </div>
      <div className="list">
        <h1>Clients {clients.length}</h1>
        {clients.map((client) => (
          <div key={`${client.id}-${client.channel?.connection.id}`}>
            <p>
              {client.id} {client.properties.nickname}
            </p>
          </div>
        ))}
      </div>
      <div className="list">
        <h1>Connections {connections.length}</h1>
        {connections.map((connection) => (
          <div key={connection.id}>
            <p>{connection.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
