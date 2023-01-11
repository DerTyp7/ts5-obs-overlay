function getClientsInChannel(channel) {
  let result = [];

  clientList.items.forEach((e) => {
    if (e.channel) {
      if (e.channel.id == channel.id && !(CONFIG.hideSelf && selfClient && e.id == selfClient.id)) {
        result.push(e);
      }
    }
  });
  return result;
}
