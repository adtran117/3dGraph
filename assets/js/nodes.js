var Nodes = {
  collection: []
};

Nodes.createNode = (pos = [], color = 0x00AAFF, sprite = 'node.png', name) => {
  if (pos.length < 3) {
    throw new Error('App.createNode() - Wrong number of coordinates for pos');
    return;
  }
  let map = new THREE.TextureLoader().load('assets/img/' + sprite);

  let material = new THREE.SpriteMaterial({ 
    map, 
    color,
    fog: true
  });

  let node = new THREE.Sprite(material);

  node.name = name;
  node.isNode = true;
  node.edges = [];
  node.connections = [];
  node.scale.set(0.25, 0.25, 0.25);

  node.position.x = pos[0];
  node.position.y = pos[1];
  node.position.z = pos[2];

  Nodes.collection.push(node);
  App.scene.add(node);

  return node;
};

Nodes.connectTwoNodes = (node1, node2) => {
  if (node1.connections.indexOf(node2) !== -1) {
    return;
  }

  let material = new THREE.LineBasicMaterial({ 
    color: 0x00FFFF,
    linewidth: 1,
    fog: true
  });

  let geometry = new THREE.Geometry();

  let pos1 = node1.position;
  let pos2 = node2.position;

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

  node1.connections.push(node2);
  node2.connections.push(node1);

  App.scene.add(line);
};

Nodes.connectNodes = (...args) => {
  if (args.length < 2) {
    throw new Error('App.connectNodes() - Minimum of 2 nodes required');
    return;
  }

  let length = args.length;

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      let node1 = args[i];
      let node2 = args[j];

      if (i !== j) {
        Nodes.connectTwoNodes(node1, node2);
      }
    }
  }
};

var main = Nodes.createNode([0, 0, 0], 0x22FF22);

var a = Nodes.createNode([0, 0, 2]);
var b = Nodes.createNode([-2, 0, 1]);
var c = Nodes.createNode([2, 2, -1]);

Nodes.connectTwoNodes(c, main);
Nodes.connectTwoNodes(b, main);
Nodes.connectTwoNodes(c, main);

Nodes.connectNodes(a, b, main);