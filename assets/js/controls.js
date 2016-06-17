var Controls = {
  isMouseMoving: false
};

App.onMouseMove = (event) => {
  App.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  App.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  RC.raycasters.camera.setFromCamera(App.mouse, App.camera);
  // console.log(RC.raycasters.camera.ray);

  // Controls.update();
};

App.onMouseDown = (event) => {
  RC.handleMouseDown(event);
};

Controls.update = () => {
  let dir = RC.raycasters.camera.ray.direction;
  let newDir = new THREE.Vector3(dir.x * 10, dir.y * 10, dir.z * 10);
  // let rot = App.camera.rotation;
    // console.log(dir);

  // console.log(newDir);
  App.camera.lookAt(newDir);

  // if (rot.x !== dir.x) {
  //   let diff = Math.sign(rot.x - dir.y) / 20;

  //   rot.x += diff;
  // }
  // App.camera.rotation.x += (App.mouse.y / 20);
  // App.camera.rotation.y += -(App.mouse.x / 20);
};