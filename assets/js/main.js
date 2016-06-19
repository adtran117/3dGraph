/*

  === TODOS ==

  [ ]  Implement MVC for nodes
  [ ]  More modularity, separation of concerns
  [X]  Change awfulness in nodes.js on lines 156-210 to actual functions
  [ ]  Make nodes appear surrounding the parent node distributedly (is that a word?)

*/

const App = {};

App.init = () => {
  App.mouse = new THREE.Vector2(0, 0);

  App.scene = new THREE.Scene();
  App.camera = new THREE.PerspectiveCamera(75, 
    window.innerWidth / window.innerHeight, 0.1, 1000);

  App.camera.position.z = 4;
  App.scene.add(App.camera);

  App.renderer = new THREE.WebGLRenderer();
  App.renderer.setSize(window.innerWidth, window.innerHeight);

  App.controls = new THREE.TrackballControls(App.camera, App.renderer.domElement);

  document.body.appendChild(App.renderer.domElement);

  App.selectedNode = []; 

  let collection = new NodeCollection();
  let node = new NodeView({
    id: 0,

    object: {
      position: [0, 0, 0]
    },

    texture: {
      sprite: 'node.png'
    },

    material: {
      color: 0x22FF22
    }

  }, 
    collection);

  App.render();
}

App.render = () => {
  requestAnimationFrame(App.render);
  App.controls.update();
  // RC.handleMouseOver();
  App.renderer.render(App.scene, App.camera);
};