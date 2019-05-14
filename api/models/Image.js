module.exports = {
  attributes: {
    pet: {
      model: 'pet'
    },

    url: {
      type: 'string',
      required: true
    },

    data: {
      type: 'json'
    }
  },

  customToJSON: function () {
    return _.omit(this, ['data'])
  }
}

