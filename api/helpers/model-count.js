module.exports = {
  friendlyName: 'Count model objects',

  description: '',

  inputs: {
    model: {
      type: 'ref',
      required: true
    },

    criteria: {
      type: 'ref',
      required: true
    }
  },

  exits: {},

  fn: async function (inputs, exits) {
    let count = await inputs.model
      .count(inputs.criteria)
      .meta({ makeLikeModifierCaseInsensitiveInMongo: true })
    return exits.success(count)
  }
}
