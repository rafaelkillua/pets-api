module.exports = {
  friendlyName: 'List',

  description: 'List pets',

  inputs: {
    name: {
      type: 'string'
    },

    status: {
      type: 'json',
      custom: value => sails.helpers.validators.stringarrayValidator(value)
    },

    page: {
      type: 'number',
      defaultsTo: 1
    },

    rowsPerPage: {
      type: 'number',
      defaultsTo: 10
    }
  },

  exits: {},

  fn: async function (inputs, exits) {
    const { name, status } = inputs
    let { page, rowsPerPage } = inputs
    page = page - 1
    let results = []
    let query = {}

    if (name) {
      query.name = {
        like: `%${name}%`
      }
    }

    if (status) {
      query.status = status
    }

    results = await Pet.find(query)
      .meta({ makeLikeModifierCaseInsensitiveInMongo: true })
      .limit(rowsPerPage === -1 ? Number.MAX_SAFE_INTEGER : rowsPerPage)
      .skip(page * rowsPerPage)
      .sort('createdAt DESC')

    results = await Promise.all(results.map(pet => sails.helpers.pet.deepPopulateById(pet.id)))

    results = await sails.helpers.setResultsMeta.with({
      model: Pet,
      criteria: query,
      results,
      page,
      rowsPerPage
    })

    return exits.success(results)
  }
}
