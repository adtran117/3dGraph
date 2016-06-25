/*

  This is the NodeView
  To be perfectly honest this is just for consistency with MVC's sake.

  You don't want to directly interact with the NodeModel from ThreeJS
  Use get, getData, set, and setData on the NodeView.

    *******************************************************
    **   DO NOT CREATE A NodeModel instance ON ITS OWN   **
    **        CREATE A NodeView INSTANCE INSTEAD         **
    *******************************************************

*/

class NodeView {
  constructor (data, collection) {
    if (arguments.length < 2) {
      throw new Error(
        'NodeView constructor(data, collection) - Wrong number of arguments');
      return;
    }
    this.collection = collection;

    /*
    
      data = {

        // Data for the actual object that will be added to the scene
        object: {
          (arr) position: A three-item array
        }   

        // Data for the node material
        material: {
          [OPTIONAL] (hex) color: A hex of the color that the node is supposed to be
        }

        // Data for the texture that the material will use
        texture: {
          [OPTIONAL] (str) sprite:
            A filepath for the sprite the node will use. 
            Default is the GitHub logo.
        }

        // Data for the NodeModel object
        data: {
          (int) id: Unique identifier for the node
          (str) name: The node's display name
          (str) type: 'User' or 'Repo'
          (obj) info: Object containing the actual GitHub data (e.g. avatar_url)
        }
      };

    */

    if (this.collection.hasOwnProperty(data.id)) { return; }

    if (!data.hasOwnProperty('material')) { data.material = {}; }
    if (!data.hasOwnProperty('texture')) { data.texture = {}; }
    if (!data.hasOwnProperty('object')) { data.object = {}; }

    if (!data.texture.hasOwnProperty('sprite')) {
      data.texture.sprite = 'assets/img/invertocat.png';
    }

    this.model = new NodeModel(data, collection);

    let model = this.model;
    let loader = new THREE.TextureLoader();

    // This is so we can load the image from another website
    loader.crossOrigin = 'anonymous';

    model.texture = loader.load(data.texture.sprite);
    model.material = new THREE.SpriteMaterial({ 
      map: model.texture, 
      color: data.material.color || 0xFFFFFF
    });

    model.object = new THREE.Sprite(model.material);
    model.object.model = model;
    model.object.view = this;

    model.isNode = true;
    model.edges = [];
    model.connections = {};

    model.object.scale.set(0.5, 0.5, 0.5);

    let pos = data.object.position;

    model.object.position.x = pos[0];
    model.object.position.y = pos[1];
    model.object.position.z = pos[2];

    model.data = data.data;

    model.collection.add(model);
    App.scene.add(model.object);
  }

  onClick (data) {
    this.model.onClick(data);
  }

  onMouseOver () {
    this.model.onMouseOver();
  }

  get (key) {
    return this.model.get(key);
  }
  
  getData (key) {
    return this.model.getData(key);
  }

  set (key, value) {
    this.model.set(key, value);
  }

  setData (key, value) {
    this.model.setData(key, value);
  }
}