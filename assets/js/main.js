/*

  === TODOS ==

  [ ]  Implement MVC for nodes
  [ ]  More modularity, separation of concerns
  [X]  Change awfulness in nodes.js on lines 156-210 to actual functions
  [ ]  Make nodes appear surrounding the parent node distributedly (is that a word?)

*/

const App = {};

App.createPlane = (data) => {
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

App.init = () => {
  App.mouse = new THREE.Vector2(0, 0);

  App.scene = new THREE.Scene();
  App.camera = new THREE.PerspectiveCamera(75, 
    window.innerWidth / window.innerHeight, 0.1, 1000);

  App.camera.position.z = 4;
  // App.scene.add(App.camera);

  App.groundPlane = App.createPlane({
    geometry: {
      width: 1000,
      height: 1000,
      widthSegments: 16,
      heightSegments: 16
    },

    material: {
      color: 0x00FFFF,
      wireframe: true
    }
  });

  App.scene.add(App.groundPlane);

  App.renderer = new THREE.WebGLRenderer();
  App.renderer.setSize(window.innerWidth, window.innerHeight);

  App.controls = new THREE.TrackballControls(App.camera, App.renderer.domElement);

  document.body.appendChild(App.renderer.domElement);

  App.selectedNode = []; 

  App.Users = new NodeCollection();
  let user = new NodeView({
    object: {
      position: [0, 0, 0]
    },

    texture: {
      sprite: 'node.png'
    },

    material: {
      color: 0x22FF22
    },

    data: exampleUserData[0]
  }, 
    App.Users);

  App.Repos = new NodeCollection();
  
  let repo = new NodeView({
    object: {
      position: [0, 0, 5]
    },

    texture: {
      sprite: 'node.png'
    },

    material: {
      color: 0x22FF22
    },

    data: exampleRepoData[0]
  }, 
    App.Repos);

  App.render();
}

App.render = () => {
  requestAnimationFrame(App.render);
  App.controls.update();
  // RC.handleMouseOver();
  App.renderer.render(App.scene, App.camera);
};