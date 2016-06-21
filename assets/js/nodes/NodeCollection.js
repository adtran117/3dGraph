class NodeCollection {
  constructor () {
    this._storage = {};
  }

  has (id) {
    return this._storage.hasOwnProperty(id);
  }

  get (id) {
    return this._storage[id];
  }

  add (...args) {
    if (args.length < 1) {
      throw new Error(
        'NodeCollection.add() - Minimum of 1 object required');
      return;
    }

    let length = args.length;

    for (let i = 0; i < length; i++) {
      this._addOne(args[i]);
    }
  }

  _addOne (obj) {
    this._storage[obj.data.id] = obj;
  }

  connectNodes (...args) {
    if (args.length < 2) {
      throw new Error(
        'NodeCollection.connectNodes() - Minimum of 2 nodes required');
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
    if (node1 instanceof NodeView || node1 instanceof THREE.Sprite) {
      node1 = node1.model;
    }

    if (node2 instanceof NodeView || node2 instanceof THREE.Sprite) {
      node2 = node2.model;
    }

    if (node1.connections.hasOwnProperty(node2.data.id)) {
      return;
    }

    let material = new THREE.LineBasicMaterial({ 
      color: 0xDAFAEC,
      linewidth: 4,
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

    node1.connections[node2.data.id] = node2;
    node2.connections[node1.data.id] = node1;

    App.scene.add(line);
  }
}