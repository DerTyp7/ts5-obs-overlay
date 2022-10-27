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

class List {
  constructor(items = []) {
    this.items = items;
  }

  getById(id) {
    return this.items.filter((obj) => {
      return obj.id === id;
    })[0];
  }

  add(item) {
    if (!this.getById(item.id)) {
      this.items.push(item);
    } else {
      console.error(`An item with id ${item.id} already exists in list`);
    }
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
