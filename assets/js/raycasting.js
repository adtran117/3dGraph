const Ray = {};

// Different raycasters for different purposes
// Raycasters fire a "ray" in a straight line in a direction from an origin point
// and returns an array of all the objects it collides with
// Colliding with an object does not stop it
Ray.casters = {
  hover: new THREE.Raycaster(),
  click: new THREE.Raycaster(),
  camera: new THREE.Raycaster(),
  // collision: new THREE.Raycaster(), // TODO?
};

Ray.handleMouseOver = () => {
  let selectedNode = App.selectedNode;
  let label = document.getElementById('label');

  if (typeof selectedNode !== 'undefined' && selectedNode !== null) {
    // Temporarily unhighlight
    selectedNode.material.color.set(0xFFFFFF);

    // Set info box's coordinates to mouse's
    label.style.left = Controls.mouse.x + 'px';
    label.style.top = Controls.mouse.y + 'px';

    // Set info box's text to display info
    label.innerHTML = 
      '<small>(' + selectedNode.view.getData('type') + ')</small><br /> id: ' +
      selectedNode.view.getData('id') + 
      '<br /> name: ' + selectedNode.view.getData('name');

    // Unhide info box
    label.style.visibility = 'visible';
  } else {
    // Hide info box and set text to empty
    label.style.visibility = 'hidden';
    label.innerHTML = '';
  }

  App.selectedNode = null;

  // Fire the ray specific to checking for hovering
  Ray.casters.hover.setFromCamera(App.mouse, App.camera);

  // Get all the objects the ray intersected in the scene
  let intersects = Ray.casters.hover.intersectObjects(App.scene.children);
  let length = intersects.length;

  // The first intersected object may not be a node, so lets loop through until
  // we find one
  for (let i = 0; i < length; i++) {
    if (intersects.length > 0) {

      // If the object at index i is a node (it could potentially be a line, the camera, something else...)
      if (typeof intersects[i].object.model !== 'undefined' && 
        intersects[i].object.view.get('isNode')) {

        // Call the hover handler method on the view
        intersects[i].object.view.onMouseOver();
        break;
      }
    }
  }
};

// On click event
Ray.handleMouseDown = (event) => {
  let node = App.selectedNode;

  if (typeof node === 'undefined' || node === null) { return; }

  let controls = App.controls;
  let obj = controls.object;
  let target = controls.target;

  // Get the distance from the target node and the camera
  let x = Math.abs(target.x - obj.position.x);
  let y = Math.abs(target.y - obj.position.y);
  let z = Math.abs(target.z - obj.position.z);

  let dist = new THREE.Vector3(x, y, z).length();

  // Lock the camera's maxDistance while moving the camera to another node
  App.controls.maxDistance = dist;

  // For query params
  let type = node.view.getData('type');

  // We'll want to get the opposite type
  let other = (type === 'User' ? 'Repos' : 'Users');

  // Get repos/users from the database based on who contributed to what
  $.ajax({
    url: 'http://localhost:3000/api/v1/' + type.toLowerCase() + 's/' 
      + node.model.data.name + '?get' + other + '=true',
      
    method: 'GET',
    success: (data) => { 
      data = JSON.parse(data);
      node.view.onClick(data);
    },
    error: (err) => { console.log('Error:', err); }
  });
}; 
