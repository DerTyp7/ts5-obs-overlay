function getClientsInChannel(channel) {
	let result = [];

	clients.forEach((e) => {
		if (e.channel.id == channel.id) {
			result.push(e);
		}
	});
	console.log(result);
	return result;
}
