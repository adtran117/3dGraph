class NodeModel {
  constructor (data, collection) {
    if (arguments.length < 2) {
      throw new Error(
        'NodeModel constructor(data, collection) - Wrong number of arguments');
      return;
    }

    if (typeof data === 'undefined') {
      throw new Error(
        'NodeModel constructor(data, collection) - data required');
      return;
    }

    if (data.object.position.length < 3) {
      throw new Error(
        'NodeModel constructor(data, collection) - Wrong number of coordinates for position');
      return;
    }

    this.collection = collection;
  }

  onClick() {
    // App.controls.target = this.object.position;
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

      let x = -1 + Math.random() * 2;
      let y = -1 + Math.random() * 2;
      let z = -1 + Math.random() * 2;
      let d = 1 / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
      x *= d;
      y *= d;
      z *= d;

      // let x = (Math.random() * 2) + 1;
      // let y = (Math.random() * 2) + 1;
      // let z = (Math.random() * 2) + 1;

      // let R = 3;

      // let latitude = i / R;
      // let longitude = (2 * Math.atan(Math.exp(i / R))) - (Math.PI / 2);

      // let x = R * Math.cos(latitude) * Math.cos(longitude);
      // let y = R * Math.cos(latitude) * Math.sin(longitude);
      // let z = R * Math.sin(latitude);

      // if (Math.round(Math.random()) === 1) { x = -x; }
      // if (Math.round(Math.random()) === 1) { y = -y; }
      // if (Math.round(Math.random()) === 1) { z = -z; }


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
            position: [(nx + x) * 1.5, (ny + y) * 1.5, (nz + z) * 1.5]
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