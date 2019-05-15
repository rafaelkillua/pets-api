module.exports = {
  friendlyName: 'Sync',

  description: 'Sync user on startup',

  exits: {},

  fn: async function (inputs, exits) {
    const user = await User.findOne({ id: this.req.sender.id }).populate('city')
    return exits.success(user)
  }
}
