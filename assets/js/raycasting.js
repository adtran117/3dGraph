var RC = {};

RC.raycasters = {
  hover: new THREE.Raycaster(),
  click: new THREE.Raycaster()
};

App.onMouseMove = (event) => {
  App.mouse.isMoving = true;
  App.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  App.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;   
  App.mouse.isMoving = false;
};

App.onMouseDown = (event) => {
  RC.handleMouseDown(event);
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

  let number = Math.round(Math.random() * 6);

  let nx = node.position.x;
  let ny = node.position.y;
  let nz = node.position.z;

  let prevNode = null;

  for (let i = 0; i < number; i++) {
    let x = (Math.random() * 3);
    let y = (Math.random() * 3);
    let z = (Math.random() * 3);

    if (Math.round(Math.random()) === 1) {
      x = -x;
    }

    if (Math.round(Math.random()) === 1) {
      y = -y;
    }

    if (Math.round(Math.random()) === 1) {
      z = -z;
    }

    let newNode = Nodes.createNode([nx + x, ny + y, nz + z]);

    if (Math.round(Math.random() * 2) === 1) {
      let randomIndex = Math.round(Math.random() * (Nodes.collection.length - 1));
      let connect = Nodes.collection[randomIndex];

      if (connect !== newNode) {
        Nodes.connectTwoNodes(connect, newNode);
      }
    }

    Nodes.connectTwoNodes(newNode, node);
  }

  // let scale = 0;
  // if (event.button === 0) {
  //   scale = 0.25;
  // } else if (event.button === 2) {
  //   scale = -0.25;
  // }

  // if (App.selectedNode.length > 0 && !App.mouse.isMoving) {
  //   let node = App.selectedNode[0];
  //   node.scale.set(node.scale.x + scale, node.scale.y + scale, node.scale.z + scale);
  // }
}; 

window.addEventListener('mousemove', App.onMouseMove, false);
window.addEventListener('mousedown', App.onMouseDown, false);