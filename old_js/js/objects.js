class Connection {
  constructor(id) {
    this.id = +id;
  }
}

class Channel {
  constructor(id, connectionId, name) {
    this.id = +id;
    this.connectionId = +connectionId;
    this.name = name;
  }
}

class Client {
  constructor(id, connectionId, channel, name, inputMuted = false, outputMuted = false, talkStatus = 0) {
    this.id = +id;
    this.connectionId = +connectionId;
    this.channel = channel;
    this.name = name;
    this.inputMuted = inputMuted;
    this.outputMuted = outputMuted;
    this.talkStatus = talkStatus;
    console.log(`Client created: ${this.id} - ${this.name}`);
  }

  isMuted() {
    return this.inputMuted == true || this.outputMuted == true;
  }

  isHidden() {
    return (
      (CONFIG.hideSilent && (this.talkStatus == 0 || this.isMuted())) || (CONFIG.hideSelf && this.id == selfClient.id)
    );
  }
}

class List {
  constructor(items = []) {
    this.items = items;
  }

  getByIds(id, connectionId) {
    id = +id;
    connectionId = +connectionId;

    console.log(id, connectionId);
    return this.items.filter((obj) => {
      return obj.id == id && obj.connectionId == connectionId;
    })[0];
  }

  add(item) {
    this.items.push(item);
    // if (!this.getById(item.id)) {
    //   this.items.push(item);
    // } else {
    //   console.error(`An item with id ${item.id} already exists in list`);
    // }
  }

  remove(item) {
    this.items.splice(this.items.indexOf(item), 1);
  }

  clear() {
    this.items = [];
  }

  setItems(items) {
    // Never tested
    let duplicateFound = false;
    items.forEach((e1, i) => {
      items.forEach((e2, j) => {
        if (e1.id === e2.id && i != j) {
          duplicateFound = true;
        }
      });
    });
    if (!duplicateFound) {
      this.items = items;
    }
  }
}
