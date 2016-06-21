const Controls = {};

Controls.init = () => {
  Controls.destination = App.controls.target;
  Controls.targetObj;
  Controls.minDistance = App.controls.minDistance;
  Controls.maxDistance = App.controls.maxDistance;
};

Controls.onMouseMove = (event) => {
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

    let mul = 0.05;

    if (Math.abs(diffx) >= mul) {
      App.controls.target.x += (Math.sign(diffx) * mul);
    } else {
      // To prevent infinite jittering
      App.controls.target.x = dest.x;
    }

    if (Math.abs(diffy) >= mul) {
      App.controls.target.y += (Math.sign(diffy) * mul);
    } else {
      App.controls.target.y = dest.y;
    }

    if (Math.abs(diffz) >= mul) {
      App.controls.target.z += (Math.sign(diffz) * mul);
    } else {
      App.controls.target.z = dest.z;
    }
  } else {
    App.controls.minDistance = Controls.minDistance;
    App.controls.maxDistance = Controls.maxDistance;
  }
};

window.addEventListener('mousemove', Controls.onMouseMove);
window.addEventListener('click', Controls.onMouseDown);
