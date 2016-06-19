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

    console.log(data);

    this.collection.add(this);
    App.scene.add(this.object);
  }

  onClick() {
    let repos = this.data.repos;
    let length = repos.length;

    let obj = model.object;

    let nx = obj.position.x;
    let ny = obj.position.y;
    let nz = obj.position.z;

    for (let i = 0; i < length; i++) {

      let repoId = repos[i];

      let x = (Math.random() * 2);
      let y = (Math.random() * 2);
      let z = (Math.random() * 2);

      if (Math.round(Math.random()) === 1) { x = -x; }
      if (Math.round(Math.random()) === 1) { y = -y; }
      if (Math.round(Math.random()) === 1) { z = -z; }

      let newNode = Nodes.createNode([nx + x, ny + y, nz + z], 
        exampleRepoData[repoId], 0x22FF22);

      if (Math.round(Math.random() * 2) === 1) {
        let randomIndex = Math.round(Math.random() * (Nodes.collection.length - 1));
        let connect = Nodes.collection[randomIndex];

        if (connect !== newNode) {
          Nodes.connectTwoNodes(connect, newNode);
        }
      }

      Nodes.connectTwoNodes(newNode, node);
    }
  }
}