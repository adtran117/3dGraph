class NodeView {
  constructor (data, collection, model) {
    this.collection = collection;

    if (this.collection.hasOwnProperty(data.id)) {
      return;
    }

    if (!data.hasOwnProperty(data.material.color)) {
      data.material.color = 0x00AAFF;
    }

    if (!data.texture.hasOwnProperty('sprite')) {
      data.texture.sprite = 'node.png';
    }

    this.model = new NodeModel(data, collection);
  }

  onClick () {
    let repos = model.data.repos;
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