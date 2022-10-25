function getClientsInChannel(channel) {
	let result = [];

	clientList.items.forEach((e) => {
		if (e.channel.id == channel.id) {
			result.push(e);
		}
	});
	return result;
}
