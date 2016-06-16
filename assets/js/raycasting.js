App.raycaster = new THREE.Raycaster();
App.mouse = new THREE.Vector2(0, 0);
App.selectedNode = [];

App.onMouseMove = (event) => {
  App.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  App.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;   
};

App.handleMouseOver = () => {
  if (App.selectedNode.length > 0) {
    App.selectedNode[0].material.color.set(App.selectedNode[1]);
  }

  App.selectedNode = [];

  App.raycaster.setFromCamera(App.mouse, App.camera);

  let intersects = App.raycaster.intersectObjects(App.scene.children);
  let length = intersects.length;

  for (let i = 0; i < length; i++) {

    if (intersects.length > 0) {
      if (intersects[i].object.isNode) {

        App.selectedNode[0] = intersects[0].object;
        App.selectedNode[1] = App.selectedNode[0].material.color.getHex();

        intersects[0].object.material.color.setRGB(1, 0, 0);
        break;
      }
    }
  }
};

window.addEventListener('mousemove', App.onMouseMove, false);