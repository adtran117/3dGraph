const Controls = { 
  mouse: { x: 0, y: 0 }
};

Controls.init = () => {
  Controls.targetObj;
  Controls.destination = App.controls.target;
  // Controls.minDistance = App.controls.minDistance;
  Controls.maxDistance = App.controls.maxDistance;
};

Controls.onMouseMove = (event) => {
  Controls.mouse.x = event.clientX;
  Controls.mouse.y = event.clientY;

  App.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  App.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  Ray.casters.camera.setFromCamera(App.mouse, App.camera);
};

Controls.onMouseDown = (event) => {
  Ray.handleMouseDown(event);
};

Controls.update = () => {
  let dest = Controls.destination;
  let pos = App.controls.target;

  if (dest.x !== pos.x || dest.y !== pos.y || dest.z !== pos.z) {

    // Get difference between distance and camera's focus point
    let diffx = dest.x - pos.x;
    let diffy = dest.y - pos.y;
    let diffz = dest.z - pos.z;

    let mulx, muly, mulz;

    if (Math.abs(diffx) > 2) { mulx = Math.abs(diffx); }
      else { mulx = Math.abs(Math.sin(diffx)); }

    if (Math.abs(diffy) > 2) { muly = Math.abs(diffy); }
      else { muly = Math.abs(Math.sin(diffy)); }

    if (Math.abs(diffz) > 2) { mulz = Math.abs(diffz); }
      else { mulz = Math.abs(Math.sin(diffz)); }


    let mul = 0.075;
    let min = 0.0001;

    if (Math.abs(diffx) >= min && mulx >= min) {
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
    // App.controls.minDistance = Controls.minDistance;
    App.controls.maxDistance = Controls.maxDistance;
  }
};

window.addEventListener('mousemove', Controls.onMouseMove);
window.addEventListener('click', Controls.onMouseDown);
