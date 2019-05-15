module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true
    },

    owner: {
      model: 'user',
      required: true
    },

    species: {
      model: 'species',
      required: true
    },

    race: {
      type: 'string',
      required: true
    },

    gender: {
      type: 'string',
      isIn: ['male', 'female'],
      required: true
    },

    status: {
      type: 'string',
      isIn: ['lost', 'found', 'adopt', 'finished'],
      required: true
    },

    description: {
      type: 'string',
      required: true
    },

    contact: {
      type: 'string',
      required: true
    },

    address: {
      model: 'address',
      required: true
    },

    images: {
      collection: 'image',
      via: 'pet'
    }
  }
}

