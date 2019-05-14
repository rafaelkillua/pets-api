module.exports = {
  friendlyName: 'Validate Array of Strings',

  sync: true,

  inputs: {
    array: {
      type: 'json',
      required: true
    }
  },

  exits: {},

  fn: (inputs, exits) => {
    const { array } = inputs

    const allElementsAreString = value => {
      value.forEach(v => {
        if (!_.isString(v)) { return false }
      })
      return true
    }

    const checkStatus = value => _.isArray(value) && allElementsAreString(value)

    return exits.success(checkStatus(array))
  }
}
