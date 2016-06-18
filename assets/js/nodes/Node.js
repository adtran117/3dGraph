class Node {
  collection = {};
  
  constructor (pos = [], data, color = 0x00AAFF, sprite = 'node.png') {
    if (typeof data === 'undefined') {
      throw new Error('Node constructor(pos, data[, color, sprite]) - data required');
      return;
    }

    if (pos.length < 3) {
      throw new Error('Node constructor(pos, data[, color, sprite]) - pos: Wrong number of coordinates');
      return;
    }

    if (data.type === 'repo') {
      if (Users.hasOwnProperty(data.id)) {
        return;
      }
    } else if (data.type === 'user') {
      if (Repos.hasOwnProperty(data.id)) {
        return;
      }
    }

    let map = new THREE.TextureLoader().load('assets/img/' + sprite);

    let material = new THREE.SpriteMaterial({ 
      map, 
      color,
      fog: true
    });

    let node = new THREE.Sprite(material);

    node.isNode = true;
    node.edges = [];
    node.connections = [];
    node.scale.set(0.25, 0.25, 0.25);

    node.data = data;

    node.position.x = pos[0];
    node.position.y = pos[1];
    node.position.z = pos[2];

    Nodes.collection.push(node);
    App.scene.add(node);

    return node;
  };
}

NodeModel.connectTwoNodes = (node1, node2) => {
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

NodeModel.connectNodes = (...args) => {
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

NodeModel.on('click', function () {
  let repos = node.data.repos;
  let length = repos.length;

  let nx = node.position.x;
  let ny = node.position.y;
  let nz = node.position.z;

  for (let i = 0; i < length; i++) {

    let repoId = repos[i];

    
    let x = (Math.random() * 2);
    let y = (Math.random() * 2);
    let z = (Math.random() * 2);

    if (Math.round(Math.random()) === 1) { x = -x; }
    if (Math.round(Math.random()) === 1) { y = -y; }
    if (Math.round(Math.random()) === 1) { z = -z; }

    let newNode = Nodes.createNode([nx + x, ny + y, nz + z], 
      exampleRepoData[repoId], 0x22FF22);

    if (Math.round(Math.random() * 2) === 1) {
      let randomIndex = Math.round(Math.random() * (Nodes.collection.length - 1));
      let connect = Nodes.collection[randomIndex];

      if (connect !== newNode) {
        Nodes.connectTwoNodes(connect, newNode);
      }
    }

    Nodes.connectTwoNodes(newNode, node);
  }
});