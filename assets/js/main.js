const App = { 
  // Used for keeping track of the cursor's movement on the canvas
  // This is for raycasting so hovering over and clicking works
  mouse: new THREE.Vector2(0, 0)
};

App.init = () => {
  // Creating our scene and essential utility objects
  App.scene = new THREE.Scene();
  App.camera = new THREE.PerspectiveCamera(75, 
    window.innerWidth / window.innerHeight, 0.1, 1000);

  App.camera.position.z = 4;
  App.scene.add(App.camera);

  App.renderer = new THREE.WebGLRenderer();
  App.renderer.setSize(window.innerWidth, window.innerHeight);


  // Creating camera controls
  App.controls = new THREE.TrackballControls(App.camera);

  // Camera control configuration
  App.controls.minDistance = 0.4;
  App.controls.maxDistance = 10;

  // Initialize the controls and all that goes with it
  Controls.init();

  // Two separate collections for users and repos
  // This is for easier finding and just in case a user and a repo share the same ID
  App.Users = new NodeCollection();
  App.Repos = new NodeCollection();

  // Get data from database for certik
  $.ajax({
    // Test user certik
    url: 'http://localhost:3000/api/v1/users/certik',
    method: 'GET',

    success: (data) => { 
      data = JSON.parse(data);

      // Parsing the results to get the information we want
      let props = data[0]._fields[0].properties;

      // Starting user
      let user = App.createNodeFromData({
        id: props.id['low'],
        name: props.login,
        type: 'User',
        collection: App.Users,
        position: [0, 0, 0],
        props: props
      });

      // Add canvas to our page
      document.body.appendChild(App.renderer.domElement);

      // Start the render loop
      App.render();
    },

    error: (err) => {
      document.body.innerHTML = 'AJAX request error: ' + err.toString();
    }
  });

};

/*
  ********** App.createNodeFromData ***********

  This is the function you'll want to use when creating a node from an AJAX request.

  The only parameter, data, should look like this:

  data = {
    (int) id: GitHub id
    (str) name: User's `login` or Repo's `name`
    (str) type: 'User' or 'Repo'
    (obj) collection: The NodeCollection we'll be putting this node in
    (arr) position: A three-item array containing x, y, and z coordinates

    (obj) props:
      Object containing properties obtained from AJAX request.
      Basically `data[0]._fields[0].properties` from earlier.
  };
  
*/

App.createNodeFromData = (data) => {
  let props = data.props;
  let type = data.type;
  let id = data.id;

  return new NodeView({
    object: {
      position: data.position
    },

    texture: {
      sprite: (type === 'User' ? props.avatar_url : 'assets/img/invertocat.png')
    },

    data: {
      id: data.id,
      name: (type === 'User' ? props.login : props.name),
      type: type,
      info: props
    }
  }, 
    data.collection);
};

App.render = () => {
  // This is a canvas thing - not too sure what it does tbh
  requestAnimationFrame(App.render);

  App.controls.update();
  Controls.update();

  App.renderer.render(App.scene, App.camera);
};
