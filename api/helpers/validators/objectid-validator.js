module.exports = {
  friendlyName: 'Validate ObjectID',

  sync: true,

  inputs: {
    id: {
      type: 'string',
      required: true
    }
  },

  exits: {},

  fn: (inputs, exits) => {
    const { id } = inputs
    return exits.success(/^[0-9a-fA-F]{24}$/.test(id))
  }
}
