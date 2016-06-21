const exampleUserData = {
  0: {
    id: 0,
    name: 'Fred',
    connectedTo: [0, 2, 3, 5],
    type: 'user'
  },

  1: {
    id: 1,
    name: 'Allen',
    connectedTo: [2, 5],
    type: 'user'
  },

  4: {
    id: 4,
    name: 'Mike',
    connectedTo: [5],
    type: 'user'
  },

  10: {
    id: 10,
    name: 'Karen',
    connectedTo: [1, 4],
    type: 'user'
  },

  7: {
    id: 7,
    name: 'Steve',
    connectedTo: [3, 1],
    type: 'user'
  }
};

const exampleRepoData = {
  0: {
    id: 0,
    name: 'Test0',
    connectedTo: [0],
    type: 'repo'
  },

  1: {
    id: 1,
    name: 'Test1',
    connectedTo: [10],
    type: 'repo'
  },

  2: {
    id: 2,
    name: 'Test2', 
    connectedTo: [0, 1],
    type: 'repo'
  },

  3: {
    id: 3,
    name: 'Test3',
    connectedTo: [0, 7, 1],
    type: 'repo'
  },

  4: {
    id: 4,
    name: 'Test4',
    connectedTo: [10],
    type: 'repo'
  },

  5: {
    id: 5,
    name: 'Test5',
    connectedTo: [1, 4],
    type: 'repo'
  }
};