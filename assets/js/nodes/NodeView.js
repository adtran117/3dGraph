class NodeView {
  constructor (data, collection) {
    this.collection = collection;

    if (this.collection.hasOwnProperty(data.id)) {
      return;
    }

    if (!data.material.hasOwnProperty('color')) {
      data.material.color = 0x00AAFF;
    }

    if (!data.texture.hasOwnProperty('sprite')) {
      data.texture.sprite = 'node.png';
    }

    this.model = new NodeModel(data, collection);
  }

  onClick () {
    this.model.onClick();
  }
}