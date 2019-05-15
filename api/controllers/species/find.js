module.exports = {
  friendlyName: 'List',

  description: 'List species.',

  inputs: {},

  exits: {},

  fn: async function (inputs, exits) {
    let results = []

    results = await Species.find()
      .meta({ makeLikeModifierCaseInsensitiveInMongo: true })
      .sort('name')

    return exits.success(results)
  }
}
