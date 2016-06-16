var App = {};

App.scene = new THREE.Scene();
App.camera = new THREE.PerspectiveCamera(75, 
  window.innerWidth / window.innerHeight, 0.1, 1000);

App.renderer = new THREE.WebGLRenderer();
App.renderer.setSize(window.innerWidth, window.innerHeight);

App.controls = new THREE.OrbitControls(App.camera);
// App.controls.addEventListener('change', App.render);

document.body.appendChild(App.renderer.domElement);

App.camera.position.z = 4;

// Helpers //

window.addEventListener("resize", resizeCanvas, false);
 
var resizeCanvas = (e) => {
  var myCanvas = document.getElementById('myCanvas');
  myCanvas.width = document.documentElement.clientWidth;
  myCanvas.height = document.documentElement.clientHeight;
};


// Main App methods //

App.createNode = (color = 'skyblue', sprite = 'node.png', name) => {
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
  node.scale.set(0.25, 0.25, 0.25);

  App.scene.add(node);

  return node;
};

App.createPlane = (data = {}) => {
  let geometry = new THREE.PlaneGeometry(
    data.geometry.width, 
    data.geometry.height, 
    data.geometry.widthSegments,
    data.geometry.heightSegments
  );

  let material = new THREE.MeshBasicMaterial(data.material);
  let plane = new THREE.Mesh(geometry, material);

  return plane;
};

App.linkNodes = (node1, node2) => {
  let material = new THREE.LineBasicMaterial({ 
    color: 0xAAAAAA,
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

  line.nodes = [node1, node2];

  node1.edges.push(line);
  node2.edges.push(line);

  App.scene.add(line);
};

// App.scene.add(
//   App.groundPlane = App.createPlane({
//     geometry: {
//       width: 1000,
//       height: 1000,
//       widthSegments: 16,
//       heightSegments: 16
//     },

//     material: {
//       color: 0x00FFFF,
//       wireframe: true
//     }
//   })
// );

App.render = () => {
  requestAnimationFrame(App.render);
  // App.controls.update();
  App.handleMouseOver();
  App.renderer.render(App.scene, App.camera);
};

var main = App.createNode({
  material: {
    color: 'white'
  },

  node: {
    name: 'Fred'
  }
});

var a = App.createNode();
var b = App.createNode();
var c = App.createNode();


a.position.z = 2;
b.position.z = 1;
b.position.x = -2;
c.position.z = -1;
c.position.x = 2;
c.position.y = 2;

App.linkNodes(a, main);
App.linkNodes(b, main);
App.linkNodes(c, main);

App.init = () => { 
  App.render();
};