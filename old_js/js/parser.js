// Parse teamspeak channel structure into our objects
function parseChannelInfos(channelInfos, connectionId) {
  let result = [];
  let rootChannels = channelInfos.rootChannels;
  let subChannels = channelInfos.subChannels;

  rootChannels.forEach((rc) => {
    result.push(new Channel(rc.id, connectionId, rc.properties.name));

    if (subChannels !== null && rc.id in subChannels) {
      subChannels[rc.id].forEach((sc) => {
        result.push(new Channel(sc.id, connectionId, sc.properties.name));
      });
    }
  });
  return result;
}

// Parse teamspeak clients into our objects
function parseClientInfos(clientInfos, connectionId) {
  let result = [];
  clientInfos.forEach((e) => {
    console.log("-----------------------------------");
    console.log(e);
    console.log(connectionId);
    console.log(channelList.items);
    console.log(channelList.getByIds(e.channelId, connectionId));
    console.log("-----------------------------------");

    result.push(
      new Client(
        e.id,
        connectionId,
        channelList.getByIds(e.channelId, connectionId),
        e.properties.nickname,
        e.properties.inputMuted,
        e.properties.outputMuted
      )
    );
  });
  return result;
}
