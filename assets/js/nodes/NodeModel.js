class NodeModel {
  constructor (data, collection) {
    if (arguments.length < 2) {
      throw new Error
        ('Node constructor(data, collection) - Wrong number of arguments');
      return;
    }

    if (typeof data === 'undefined') {
      throw new Error
        ('Node constructor(data, collection) - data required');
      return;
    }

    if (data.position.length < 3) {
      throw new Error(
        'Node constructor(data, collection) - Wrong number of coordinates for position');
      return;
    }

    if (this.collection.hasOwnProperty(data.id)) {
      return;
    }

    if (!data.hasOwnProperty(data.material.color)) {
      data.material.color = 0x00AAFF;
    }

    if (!data.texture.hasOwnProperty('sprite')) {
      data.texture.sprite = 'node.png';
    }

    this.id = data.id;

    this.texture = new THREE.TextureLoader().load('assets/img/' + data.texture.sprite);
    this.material = new THREE.SpriteMaterial({ 
      map: data.material.texture, 
      color: data.material.color,
      fog: true
    });

    this.object = new THREE.Sprite(this.material);

    this.isNode = true;
    this.edges = [];
    this.connections = {};

    this.object.scale.set(0.25, 0.25, 0.25);

    let pos = data.object.position;

    this.object.position.x = pos[0];
    this.object.position.y = pos[1];
    this.object.position.z = pos[2];

    this.collection.add(this);
    App.scene.add(this.object);
  }

  connectToNode (node) {
    if (node.connections.hasOwnProperty(node.id)) {
      return;
    }

    let material = new THREE.LineBasicMaterial({ 
      color: 0x00FFFF,
      linewidth: 1,
      fog: true
    });

    let geometry = new THREE.Geometry();

    let pos1 = this.object.position;
    let pos2 = node.object.position;

    geometry.vertices.push(
      new THREE.Vector3(pos1.x, pos1.y, pos1.z),
      new THREE.Vector3(pos2.x, pos2.y, pos2.z)
    );
    let line = new THREE.Line(geometry, material);

    line.object = {
      isNode: false
    };

    line.nodes = [this, node];

    this.edges.push(line);
    node.edges.push(line);

    this.connections[node.id] = node;
    node.connections[this.id] = this;
  }
}