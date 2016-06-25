const Controls = { 
  // Cursor locations for node info box on mouse over
  mouse: { x: 0, y: 0 }
};

Controls.init = () => {
  // Destination location for the camera
  Controls.destination = App.controls.target;

  // Save the maxDistance for later purposes
  Controls.maxDistance = App.controls.maxDistance;

  window.addEventListener('mousemove', Controls.onMouseMove);
  window.addEventListener('click', Controls.onMouseDown);
};

// This event fires a ray every time the mouse moves
// This is used for mousing over a node and having the info box come up
Controls.onMouseMove = (event) => {
  // Update cursor locations to actual mouse location
  Controls.mouse.x = event.clientX;
  Controls.mouse.y = event.clientY;

  // Some maths for getting the raycasting right
  // I don't understand how this works
  App.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  App.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Fire the ray
  Ray.casters.camera.setFromCamera(App.mouse, App.camera);
};

// Click event
Controls.onMouseDown = (event) => {
  Ray.handleMouseDown(event);
};

Controls.update = () => {
  Ray.handleMouseOver();

  let dest = Controls.destination;
  let pos = App.controls.target;

  // Check if moving toward a node
  // This awful unDRY if statement is so App.controls.maxDistance can be reset back to normal
  if (dest.x !== pos.x || dest.y !== pos.y || dest.z !== pos.z) {
    
    // Get difference between distance and camera's focus point
    let diffx = dest.x - pos.x;
    let diffy = dest.y - pos.y;
    let diffz = dest.z - pos.z;

    let mulx, muly, mulz;

    const mul = 0.075;
    const min = 0.0001;

    // unDRY if statement
    if (dest.x !== pos.x) {
      // This is my crappy easing algorithm
      // I cannot into math so I did this
      if (Math.abs(diffx) > 2) { mulx = Math.abs(diffx); }
        else { mulx = Math.abs(Math.sin(diffx)); }
    }

    if (dest.y !== pos.y) {
      if (Math.abs(diffy) > 2) { muly = Math.abs(diffy); }
        else { muly = Math.abs(Math.sin(diffy)); }
    }

    if (dest.z !== pos.z) {
      if (Math.abs(diffz) > 2) { mulz = Math.abs(diffz); }
        else { mulz = Math.abs(Math.sin(diffz)); }
    }
    

    if (Math.abs(diffx) >= min && mulx >= min) {
      // Math.sign returns -1 if input is < 0, 1 if input is > 0, 
      // and a 0 if input is 0

      // Change camera's x based on the difference between the destination 
      // and the current position, then use Math.sign and multiply by multiplier
      App.controls.target.x += (Math.sign(diffx) * mulx * mul);
    } else {
      // To prevent infinite jittering
      App.controls.target.x = dest.x;
    }

    if (Math.abs(diffy) >= min && mulx >= min) {
      App.controls.target.y += (Math.sign(diffy) * muly * mul);
    } else {
      App.controls.target.y = dest.y;
    }

    if (Math.abs(diffz) >= min && mulx >= min) {
      App.controls.target.z += (Math.sign(diffz) * mulz * mul);
    } else {
      App.controls.target.z = dest.z;
    }
  } else {
    // Reset the maxDistance if we're not moving towards a node
    App.controls.maxDistance = Controls.maxDistance;
  }
};
