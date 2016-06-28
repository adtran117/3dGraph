/*

  This is the NodeModel.
  Any data that needs to be stored gets stored in here.

  You don't want to directly interact with the NodeModel from ThreeJS
  Use get, getData, set, and setData on the NodeView.

    *******************************************************
    **   DO NOT CREATE A NodeModel instance ON ITS OWN   **
    **        CREATE A NodeView INSTANCE INSTEAD         **
    *******************************************************

*/

class NodeModel {
  constructor (data, collection) {
    if (arguments.length < 2) {
      throw new Error(
        'NodeModel constructor(data, collection) - Wrong number of arguments');
      return;
    }

    this.collection = collection;
  }

  get (key) {
    return this[key];
  }

  getData (key) {
    return this.data[key];
  }

  set (key, value) {
    this[key] = value;
  }

  setData (key, value) {
    this.data[key] = value;
  }

  onClick (data) {
    // Update the destination location
    Controls.destination = this.object.position;

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

      // Random chance to make it negative
      x = Math.round(Math.random()) === 1 ? -x : x;
      y = Math.round(Math.random()) === 1 ? -y : y;
      z = Math.round(Math.random()) === 1 ? -z : z;

      let model = this;
      let collection;

      if (type === 'User') { collection = App.Users; } else { collection = App.Repos; }

      // If the collection already has the node, just select that
      if (collection.has(objId)) {
        this.collection.connectNodes(this, collection.get(objId));
      } else {
        // Otherwise make a new one
        App.createNodeFromData({
          position: [(nx + x), (ny + y), (nz + z)],
          data: data[i],
          connectTo: [model]
        });
      }
    }
  }

  onMouseOver () {
    let obj = this.object;

    App.selectedNode = obj;

    obj.material.color.setRGB(1, 0, 0);
  }
}