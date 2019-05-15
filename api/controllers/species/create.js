module.exports = {
  friendlyName: 'Create',

  description: 'Create pet',

  inputs: {
    name: {
      type: 'string',
      required: true
    }
  },

  exits: {},

  fn: async function (inputs, exits) {
    const {
      name
    } = inputs

    const species = await Species.create({
      name
    }).fetch()

    return exits.success(species)
  }
}

