function parseChannelInfos(channelInfos) {
  let result = [];
  let rootChannels = channelInfos.rootChannels;
  let subChannels = channelInfos.subChannels;

  rootChannels.forEach((rc) => {
    result.push(new Channel(rc.id, rc.properties.name));

    if (subChannels !== null && rc.id in subChannels) {
      subChannels[rc.id].forEach((sc) => {
        result.push(new Channel(sc.id, sc.properties.name));
      });
    }
  });
  return result;
}

function parseClientInfos(clientInfos) {
  let result = [];
  clientInfos.forEach((e) => {
    result.push(
      new Client(
        e.id,
        channelList.getById(e.channelId),
        e.properties.nickname,
        e.properties.inputMuted,
        e.properties.outputMuted
      )
    );
  });
  return result;
}
