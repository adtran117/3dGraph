class NodeModel {
  constructor (data, collection) {
    if (arguments.length < 2) {
      throw new Error(
        'NodeModel constructor(data, collection) - Wrong number of arguments');
      return;
    }

    this.collection = collection;
  }

  onClick() {
    Controls.destination = this.object.position;

    let connectedTo = this.data.connectedTo;
    let length = connectedTo.length;

    let obj = this.object;

    let nx = obj.position.x;
    let ny = obj.position.y;
    let nz = obj.position.z;

    for (let i = 0; i < length; i++) {
      let objId = connectedTo[i];

      if (this.connections.hasOwnProperty(objId)) { continue; }

      let x = (Math.random()) + 0.5;
      let y = (Math.random()) + 0.5;
      let z = (Math.random()) + 0.5;

      x = Math.round(Math.random()) === 1 ? -x : x;
      y = Math.round(Math.random()) === 1 ? -y : y;
      z = Math.round(Math.random()) === 1 ? -z : z;

      let data, color, collection, node;

      if (this.data.type === 'user') {
        data = exampleRepoData[objId];
        collection = App.Repos;
      } else if (this.data.type === 'repo') {
        data = exampleUserData[objId];
        collection = App.Users;
      }

      if (collection.has(objId)) {
        node = collection.get(objId);
      } else {
        node = new NodeView({
          object: {
            position: [(nx + x), (ny + y), (nz + z)]
          },

          texture: {
            sprite: 'node2.png'
          },

          data: data
        }, 
          collection);
      }

      this.collection.connectNodes(node, this.object);
    }
  }

  onMouseOver () {
    let obj = this.object;

    App.selectedNode[0] = obj;
    App.selectedNode[1] = obj.material.color.getHex();

    obj.material.color.setRGB(1, 0, 0);
  }
}