/* eslint-disable react-hooks/exhaustive-deps */
import "@styles/App.scss";
import { IChannel, IClient, IConnection, ITS5ConnectionHandler } from "@interfaces/teamspeak";
import { useEffect, useState } from "react";
import Viewer from "./Viewer";
import { useSearchParams } from "react-router-dom";
import { TS5ConnectionHandler } from "@handlers/teamspeak/connectionHandler";
import useTSRemoteApp from "./hooks/useTSRemoteApp";

export default function App() {
  const [searchParams] = useSearchParams();
  const { clients, channels, connections, activeConnectionId, currentChannel } = useTSRemoteApp({
    remoteAppPort: 5899,
  });

  return (
    <div className="App">
      <Viewer
        showChannelName={searchParams.get("showChannelName") === "true"}
        hideNonTalking={searchParams.get("hideNonTalking") === "true"}
        clientLimit={searchParams.get("clientLimit") ? parseInt(searchParams.get("clientLimit") ?? "0") : 0}
        clients={
          clients.map((client) => {
            if (client.channel?.id === currentChannel?.id && client.channel.connection.id === activeConnectionId) {
              return client;
            }
          }) as IClient[]
        }
        channel={currentChannel}
      />
    </div>
  );
}
