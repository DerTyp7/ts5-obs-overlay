import "@styles/App.scss";

import { Route, Routes, useSearchParams } from "react-router-dom";
import useTSRemoteApp, { IClient } from "react-ts5-remote-app-api";
import Viewer from "./Viewer";

export default function App() {
  const [searchParams] = useSearchParams();
  const { clients, activeConnectionId, currentChannel } = useTSRemoteApp({
    remoteAppPort: parseInt(searchParams.get("remoteAppPort") ?? "5899"),
    auth: {
      identifier: "de.tealfire.obs",
      version: "2.0.0",
      name: "TS5 OBS Overlay",
      description: "A OBS overlay for TS5 by DerTyp7",
    },
    logging: true,
  });

  return (
    <Routes>
      <Route
        path="/"
        element={
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
        }
      />
    </Routes>
  );
}
