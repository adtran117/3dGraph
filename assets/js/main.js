/*

  === TODO ==

  [X]  Implement MVC for nodes
  [X]  More modularity, separation of concerns
  [X]  Change awfulness in nodes.js on lines 156-210 to actual functions
  [X]  Make nodes appear surrounding the parent node distributedly (is that a word?)

*/

const App = { mouse: new THREE.Vector2(0, 0) };

App.init = () => {
  App.scene = new THREE.Scene();
  App.camera = new THREE.PerspectiveCamera(75, 
    window.innerWidth / window.innerHeight, 0.1, 1000);

  App.camera.position.z = 4;
  App.scene.add(App.camera);

  App.renderer = new THREE.WebGLRenderer();
  App.renderer.setSize(window.innerWidth, window.innerHeight);

  App.controls = new THREE.TrackballControls(App.camera);
  App.controls.minDistance = 0.4;
  App.controls.maxDistance = 10;

  Controls.init();


  App.selectedNode = []; 

  App.Users = new NodeCollection();
  App.Repos = new NodeCollection();

  let user;

  $.ajax({
    url: 'http://localhost:3000/api/v1/users/certik',
    method: 'GET',

    success: (data) => { 
      data = JSON.parse(data);
      let props = data[0]._fields[0].properties;

      console.log(props);

      user = App.createNodeFromData({
        id: props.id['low'],
        name: props.login,
        type: 'User',
        collection: App.Users,
        position: [0, 0, 0],
        props: props
      });

      Controls.targetObj = user;

      document.body.appendChild(App.renderer.domElement);
      App.render();
    },

    error: (err) => {
      document.body.innerHTML = 'AJAX request error: ' + err.toString();
    }
  });

};

/*
  ********** App.createNodeFromData ***********

  data = {
    (int) id: GitHub id
    (str) name: User's `login` or Repo's `name`
    (str) type: 'User' or 'Repo'
    (obj) collection: The NodeCollection we'll be putting this node in
    (arr) position: A three-item array containing x, y, and z coordinates
    (obj) props: Object containing properties obtained from AJAX request
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
      sprite: (type === 'User' ? props.avatar_url : 'node2.png')
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
  requestAnimationFrame(App.render);

  App.controls.update();
  Controls.update();

  Ray.handleMouseOver();

  App.renderer.render(App.scene, App.camera);
};
