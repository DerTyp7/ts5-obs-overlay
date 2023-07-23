/* eslint-disable react-hooks/exhaustive-deps */
import "@styles/App.scss";
import { IClient } from "@interfaces/teamspeak";
import Viewer from "./Viewer";
import { useSearchParams } from "react-router-dom";
import useTSRemoteApp from "./hooks/useTSRemoteApp";

export default function App() {
  const [searchParams] = useSearchParams();
  const { clients, activeConnectionId, currentChannel } = useTSRemoteApp({
    remoteAppPort: parseInt(searchParams.get("remoteAppPort") ?? "5899"),
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
