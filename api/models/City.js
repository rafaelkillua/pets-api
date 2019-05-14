module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true
    },

    state: {
      model: 'state',
      required: true
    },

    createdAt: false,

    updatedAt: false
  },
}

