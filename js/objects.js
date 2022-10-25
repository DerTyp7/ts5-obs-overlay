class Channel {
	constructor(id, name) {
		this.id = id;
		this.name = name;
	}
}

class Client {
	constructor(
		id,
		channel,
		name,
		inputMuted = false,
		outputMuted = false,
		talkStatus = 0
	) {
		this.id = id;
		this.channel = channel;
		this.name = name;
		this.inputMuted = inputMuted;
		this.outputMuted = outputMuted;
		this.talkStatus = talkStatus;
		console.log(`Client created: ${this.id} - ${this.name}`);
	}
}
