//
module.exports = {
  friendlyName: 'Validate Date ISO String',

  sync: true,

  inputs: {
    date: {
      type: 'string',
      required: true
    }
  },

  exits: {},

  fn: (inputs, exits) => {
    const { date } = inputs
    const regex = /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$/g
    return exits.success(regex.test(date))
  }
}
