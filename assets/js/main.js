// I hope you like spaghetti

var App = {};

App.mouse = new THREE.Vector2(0, 0);
App.selectedNode = [];

App.scene = new THREE.Scene();
App.camera = new THREE.PerspectiveCamera(75, 
  window.innerWidth / window.innerHeight, 0.1, 1000);

App.renderer = new THREE.WebGLRenderer();
App.renderer.setSize(window.innerWidth, window.innerHeight);

App.controls = new THREE.OrbitControls(App.camera);
// App.controls.addEventListener('change', App.render);

document.body.appendChild(App.renderer.domElement);

App.canvas = App.renderer.domElement;
App.context = App.canvas.getContext('2d');

App.camera.position.z = 4;

// Helpers //

window.addEventListener("resize", resizeCanvas, false);
 
var resizeCanvas = (e) => {
  var myCanvas = document.getElementById('myCanvas');
  myCanvas.width = document.documentElement.clientWidth;
  myCanvas.height = document.documentElement.clientHeight;
};


// Main App methods //

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
  RC.handleMouseOver();
  App.renderer.render(App.scene, App.camera);
};

App.init = () => { 
  App.render();
};