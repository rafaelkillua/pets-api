module.exports = {
  friendlyName: 'List',

  description: 'List state.',

  inputs: {
    name: {
      type: 'string'
    }
  },

  exits: {},

  fn: async function (inputs, exits) {
    let { name } = inputs
    let results = []
    let query = {}

    if (name) { query.name = { like: `%${name}%` } }

    results = await State.find(query)
      .meta({ makeLikeModifierCaseInsensitiveInMongo: true })
      .sort('name')

    return exits.success(results)
  }
}
