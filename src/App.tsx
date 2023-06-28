/* eslint-disable react-hooks/exhaustive-deps */
import "@styles/App.scss";
import { TS5Connection } from "./teamspeak5Handler";
import { IChannel, IClient, IConnection } from "interfaces/teamspeak";
import { useEffect, useState } from "react";
import Viewer from "./Viewer";
import { useSearchParams } from "react-router-dom";

export default function App() {
  const [searchParams] = useSearchParams();

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
    const remoteAppPort = searchParams.get("remoteAppPort");

    const tsConnection: TS5Connection = new TS5Connection(
      parseInt(remoteAppPort ?? "5899"),
      setConnections,
      setChannels,
      setClients,
      setActiveConnectionId
    );
    tsConnection.connect();
  }, []);

  useEffect(() => {
    setCurrentStates();
  }, [clients, channels, connections, activeConnectionId]);

  return (
    <div className="App">
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
    </div>
  );
}