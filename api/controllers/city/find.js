module.exports = {
  friendlyName: 'List',

  description: 'List city.',

  inputs: {
    name: {
      type: 'string'
    },

    state: {
      type: 'string',
      custom: value => sails.helpers.validators.objectidValidator(value),
      required: true
    }
  },

  exits: {},

  fn: async function (inputs, exits) {
    let { name, state } = inputs
    let results = []
    let query = {}

    if (name) { query.name = { like: `%${name}%` } }
    if (state) { query.state = state }

    results = await City.find(query)
      .meta({ makeLikeModifierCaseInsensitiveInMongo: true })
      .populate('state')
      .sort('name')

    return exits.success(results)
  }
}
