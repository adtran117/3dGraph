class NodeCollection {
  constructor () {
    this._modelStorage = {};
    this._viewStorage = {};
  }

  add (...args) {
    if (args.length < 1) {
      throw new Error('NodeCollection.add() - Minimum of 1 object required');
      return;
    }

    let length = args.length;

    for (let i = 0; i < length; i++) {
      this._addOne(args[i]);
    }
  }

  _addOne (obj) {
    if (obj instanceof NodeModel) {
      if (!this._modelStorage.hasOwnProperty(obj.id)) {
        this._modelStorage[obj.id] = obj;
      }
    } else if (obj instanceof NodeView) {
      if (!this._viewStorage.hasOwnProperty(obj.model.id)) {
        this._viewStorage[obj.model.id] = obj;
      }
    }
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
          this._connectTwoNodes(node1, node2);
        }
      }
    }
  }

  _connectTwoNodes (node1, node2) {
    if (node1.connections.hasOwnProperty(node2.id)) {
      return;
    }

    let material = new THREE.LineBasicMaterial({ 
      color: 0x00FFFF,
      linewidth: 1,
      fog: true
    });

    let geometry = new THREE.Geometry();

    let pos1 = node1.object.position;
    let pos2 = node2.object.position;

    geometry.vertices.push(
      new THREE.Vector3(pos1.x, pos1.y, pos1.z),
      new THREE.Vector3(pos2.x, pos2.y, pos2.z)
    );
    let line = new THREE.Line(geometry, material);

    line.object = {
      isNode: false
    };

    line.nodes = [node1, node2];

    node1.edges.push(line);
    node2.edges.push(line);

    node1.connections[node2.id] = node2;
    node2.connections[node1.id] = node1;
  }
}