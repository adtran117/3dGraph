class NodeCollection {
  constructor () {
    this.storage = {};
  }

  add (...args) {
    if (args.length < 1) {
      throw new Error('NodeCollection.add() - Minimum of 1 node required');
      return;
    }

    let length = args.length;

    for (let i = 0; i < length; i++) {
      this._addOne(args[i]);
    }
  }

  _addOne (node) {
    if (this.storage.hasOwnProperty(node.id)) {
      return;
    }

    this.storage[node.id] = node;
  }

  connectNodes (...args) {
    if (args.length < 2) {
      throw new Error('NodeCollection.connectNodes() - Minimum of 2 nodes required');
      return;
    }

    let length = args.length;

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        let node1 = args[i];
        let node2 = args[j];

        if (i !== j) {
          node1.connectToNode(node2);
        }
      }
    }
  }
}