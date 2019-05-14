module.exports = {
  attributes: {
    street: {
      type: 'string',
      required: true
    },

    neighborhood: {
      type: 'string',
      required: true
    },

    city: {
      model: 'city',
      required: true
    },

    coordinates: {
      type: 'json'
    }
  }
}

