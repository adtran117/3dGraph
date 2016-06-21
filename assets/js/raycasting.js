const Ray = {};

Ray.casters = {
  hover: new THREE.Raycaster(),
  click: new THREE.Raycaster(),
  camera: new THREE.Raycaster(),
  collision: new THREE.Raycaster(),
};

let a = 0;

Ray.handleMouseOver = () => {
  let selectedNode = App.selectedNode;
  let label = document.getElementById('label');

  if (selectedNode.length > 0) {
    selectedNode[0].material.color.set(selectedNode[1]);

    // let x = selectedNode[0].position.x;
    // let y = selectedNode[0].position.y;
    // let z = selectedNode[0].position.z;

    label.style.left = Controls.mouse.x + 'px';
    label.style.top = Controls.mouse.y + 'px';

    label.innerHTML = 
      '<small>(' + selectedNode[0].model.data.type + ')</small><br />' +
      selectedNode[0].model.data.name;
    label.style.visibility = 'visible';
  } else {
    label.innerHTML = '';
    label.style.visibility = 'hidden';
  }

  App.selectedNode = [];

  Ray.casters.hover.setFromCamera(App.mouse, App.camera);

  let intersects = Ray.casters.hover.intersectObjects(App.scene.children);
  let length = intersects.length;

  for (let i = 0; i < length; i++) {
    if (intersects.length > 0) {
      if (typeof intersects[i].object.model !== 'undefined' && 
        intersects[i].object.model.isNode) {

        intersects[i].object.model.onMouseOver();
        break;
      }
    }
  }
};

Ray.handleMouseDown = (event) => {
  let node = App.selectedNode[0];

  if (typeof node === 'undefined') { return; }

  let controls = App.controls;
  let obj = controls.object;
  let target = controls.target;

  let x = Math.abs(target.x - obj.position.x);
  let y = Math.abs(target.y - obj.position.y);
  let z = Math.abs(target.z - obj.position.z);

  let dist = new THREE.Vector3(x, y, z).length();

  // App.controls.minDistance = dist;
  App.controls.maxDistance = dist;

  node.view.onClick();
}; 
