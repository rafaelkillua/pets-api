module.exports = {
  friendlyName: 'Validate Array of Numbers',

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

    const allElementsAreNumbers = value => {
      value.forEach(v => {
        if (_.isNaN(v)) { return false }
      })
      return true
    }

    const checkStatus = value => _.isArray(value) && allElementsAreNumbers(value)

    return exits.success(checkStatus(array))
  }
}
