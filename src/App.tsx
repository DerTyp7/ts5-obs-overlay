import "@styles/App.scss";
import { TS5Connection } from "./teamspeak5Handler";
import { IChannel, IClient, IConnection } from "interfaces/teamspeak";
import { useEffect, useState } from "react";

export default function App() {
  const [clients, setClients] = useState<IClient[]>([]);
  const [channels, setChannels] = useState<IChannel[]>([]);
  const [connections, setConnections] = useState<IConnection[]>([]);

  useEffect(() => {
    const tsConnection: TS5Connection = new TS5Connection(5899, setConnections, setChannels, setClients);
    tsConnection.connect();
  }, []);

  useEffect(() => {
    console.log("====================================");
  }, [clients, channels, connections]);

  // debug view of lists
  return (
    <div className="App">
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
