/*

  === TODOS ==

  [X]  Implement MVC for nodes
  [X]  More modularity, separation of concerns
  [X]  Change awfulness in nodes.js on lines 156-210 to actual functions
  [X]  Make nodes appear surrounding the parent node distributedly (is that a word?)

*/

const App = { mouse: new THREE.Vector2(0, 0) };

App.init = () => {
  App.scene = new THREE.Scene();
  App.camera = new THREE.PerspectiveCamera(75, 
    window.innerWidth / window.innerHeight, 0.1, 1000);

  App.camera.position.z = 4;
  App.scene.add(App.camera);

  // App.createPlane = (data) => {
  //   let geometry = new THREE.PlaneGeometry(
  //     data.geometry.width, 
  //     data.geometry.height, 
  //     data.geometry.widthSegments,
  //     data.geometry.heightSegments
  //   );

  //   let material = new THREE.MeshBasicMaterial(data.material);
  //   let plane = new THREE.Mesh(geometry, material);

  //   return plane;
  // };

  // App.groundPlane = App.createPlane({
  //   geometry: {
  //     width: 1000,
  //     height: 1000,
  //     widthSegments: 16,
  //     heightSegments: 16
  //   },

  //   material: {
  //     color: 0x00FFFF,
  //     wireframe: true
  //   }
  // });

  // App.scene.add(App.groundPlane);

  App.renderer = new THREE.WebGLRenderer();
  App.renderer.setSize(window.innerWidth, window.innerHeight);

  App.controls = new THREE.TrackballControls(App.camera);
  App.controls.minDistance = 0.4;
  App.controls.maxDistance = 2.4;
  Controls.init();

  document.body.appendChild(App.renderer.domElement);

  App.selectedNode = []; 

  App.Users = new NodeCollection();
  let user = new NodeView({
    object: {
      position: [0, 0, 0],
      isNode: true
    },

    texture: {
      sprite: 'node2.png'
    },

    material: {},

    data: exampleUserData[1]
  }, 
    App.Users);

  App.Repos = new NodeCollection();

  Controls.targetObj = user;

  App.render();
}

App.render = () => {
  requestAnimationFrame(App.render);

  App.controls.update();
  Controls.update();

  Ray.handleMouseOver();

  App.renderer.render(App.scene, App.camera);
};