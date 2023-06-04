function getClientsInChannel(channel) {
  let result = [];

  clientList.items.forEach((e) => {
    if (e.channel) {
      if (e.channel.id == channel.id) {
        result.push(e);
      }
    }
  });
  return result;
}
