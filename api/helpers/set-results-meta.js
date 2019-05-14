module.exports = {
  friendlyName: 'Set results meta data',

  description: '',

  inputs: {
    model: {
      type: 'ref',
      required: true
    },

    criteria: {
      type: 'ref',
      required: true
    },

    results: {
      type: 'ref',
      required: true
    },

    page: {
      type: 'number',
      required: true
    },

    rowsPerPage: {
      type: 'number',
      required: true
    },

    total: {
      type: 'number'
    },

    extra: {
      type: 'ref'
    }
  },

  exits: {},

  fn: async function (inputs, exits) {
    let obj = {
      data: inputs.results,
      meta: {
        actualPage: inputs.page + 1,
        perPage: inputs.rowsPerPage,
        total:
          inputs.total ||
          (await sails.helpers.modelCount.with({
            model: inputs.model,
            criteria: inputs.criteria
          }))
      }
    }
    if (inputs.extra) {
      obj.meta.extra = inputs.extra
    }
    return exits.success(obj)
  }
}
