import { IChannel, IClient } from "interfaces/teamspeak";

export default function Viewer({
  clients,
  channel,
}: {
  clients: IClient[] | undefined;
  channel: IChannel | undefined;
}) {
  return (
    <div>
      <h1>{channel?.properties.name}</h1>
      {clients?.map((client) => {
        if (client) {
          return (
            <p key={`${client.id}-${client.channel?.connection.id}`}>
              {client.talkStatus === 1 ? "🎤" : ""}
              {client.properties.inputMuted ? "🎤x" : ""}
              {client.properties.outputMuted ? "🔈" : ""}
              {client.id} {client.properties.nickname}
            </p>
          );
        } else {
          return <></>;
        }
      })}
    </div>
  );
}
