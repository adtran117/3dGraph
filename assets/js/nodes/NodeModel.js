class NodeModel {
  constructor (data, collection) {
    if (arguments.length < 2) {
      throw new Error(
        'NodeModel constructor(data, collection) - Wrong number of arguments');
      return;
    }

    if (typeof data === 'undefined') {
      throw new Error(
        'NodeModel constructor(data, collection) - data required');
      return;
    }

    if (data.object.position.length < 3) {
      throw new Error(
        'NodeModel constructor(data, collection) - Wrong number of coordinates for position');
      return;
    }


    this.collection = collection;

    this.id = data.id;

    this.texture = new THREE.TextureLoader().load('assets/img/' + data.texture.sprite);
    this.material = new THREE.SpriteMaterial({ 
      map: this.texture, 
      color: data.material.color,
      fog: true
    });

    this.object = new THREE.Sprite(this.material);

    this.isNode = true;
    this.edges = [];
    this.connections = {};

    this.object.scale.set(0.25, 0.25, 0.25);

    let pos = data.object.position;

    this.object.position.x = pos[0];
    this.object.position.y = pos[1];
    this.object.position.z = pos[2];

    this.data = data.data;

    console.log(this.object);

    this.collection.add(this);
    App.scene.add(this.object);
  }
}