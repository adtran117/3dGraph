class NodeView {
  constructor (data, collection) {
    if (arguments.length < 2) {
      throw new Error(
        'NodeView constructor(data, collection) - Wrong number of arguments');
      return;
    }
    this.collection = collection;

    if (this.collection.hasOwnProperty(data.id)) { return; }

    if (!data.hasOwnProperty('material')) { data.material = {}; }
    if (!data.hasOwnProperty('texture')) { data.texture = {}; }
    if (!data.hasOwnProperty('object')) { data.object = {}; }

    if (!data.material.hasOwnProperty('color')) {
      if (data.data.type === 'user') {
        data.material.color = 0xC6E5FC;
      } else {
        data.material.color = 0xDDFDDB;
      }
    }

    if (!data.texture.hasOwnProperty('sprite')) {
      data.texture.sprite = 'node2.png';
    }

    this.model = new NodeModel(data, collection);

    let model = this.model;

    model.texture = new THREE.TextureLoader().load('assets/img/' + data.texture.sprite);
    model.material = new THREE.SpriteMaterial({ 
      map: model.texture, 
      color: data.material.color,
      fog: true
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

  onClick () {
    this.model.onClick();
  }

  onMouseOver() {
    this.model.onMouseOver();
  }
}