var RC = {};

RC.raycasters = {
  hover: new THREE.Raycaster(),
  click: new THREE.Raycaster(),
  camera: new THREE.Raycaster(),
};

RC.handleMouseOver = () => {
  if (App.selectedNode.length > 0) {
    App.selectedNode[0].material.color.set(App.selectedNode[1]);
  }

  App.selectedNode = [];

  RC.raycasters.hover.setFromCamera(App.mouse, App.camera);

  let intersects = RC.raycasters.hover.intersectObjects(App.scene.children);
  let length = intersects.length;

  for (let i = 0; i < length; i++) {
    if (intersects.length > 0) {
      if (intersects[i].object.isNode) {

        App.selectedNode[0] = intersects[i].object;
        App.selectedNode[1] = App.selectedNode[0].material.color.getHex();

        intersects[i].object.material.color.setRGB(1, 0, 0);
        break;
      }
    }
  }
};

RC.handleMouseDown = (event) => {
  let node = App.selectedNode[0];

  if (!node) { return; }

  Nodes.onClick(node);
}; 

window.addEventListener('mousemove', App.onMouseMove);
window.addEventListener('click', App.onMouseDown);