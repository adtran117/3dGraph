class NodeModel {
  constructor (data, collection) {
    if (arguments.length < 2) {
      throw new Error(
        'NodeModel constructor(data, collection) - Wrong number of arguments');
      return;
    }

    this.collection = collection;
  }

  onClick (data) {
    Controls.destination = this.object.position;

    // let connectedTo = data.connectedTo;
    // let length = connectedTo.length;

    let length = data.length;

    let obj = this.object;

    let nx = obj.position.x;
    let ny = obj.position.y;
    let nz = obj.position.z;

    for (let i = 0; i < length; i++) {
      let datum = data[i]._fields[0];
      let props = datum.properties;
      let objId = props.id['low'];
      let type = datum.labels[0];

      if (this.connections.hasOwnProperty(objId)) { continue; }

      let x = (Math.random()) + 0.5;
      let y = (Math.random()) + 0.5;
      let z = (Math.random()) + 0.5;

      x = Math.round(Math.random()) === 1 ? -x : x;
      y = Math.round(Math.random()) === 1 ? -y : y;
      z = Math.round(Math.random()) === 1 ? -z : z;

      let color, collection, node;

      if (type === 'User') {
        collection = App.Users;
      } else if (type === 'Repo') {
        collection = App.Repos;
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

          data: {
            id: objId,
            name: (type === 'User' ? props.login : props.name),
            type: type,
            info: props
          }
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