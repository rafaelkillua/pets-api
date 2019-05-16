module.exports = {
  friendlyName: 'My Pets',

  description: 'List logged user\'s pets',

  inputs: {},

  exits: {},

  fn: async function (inputs, exits) {
    const id = this.req.sender.id
    const user = await User.findOne({ id }).populate('myPets')

    let myPets = []
    if (user.myPets) {
      myPets = await Promise.all(
        user.myPets.map(pet => sails.helpers.pet.deepPopulateById(pet.id))
      )
    }

    return exits.success(myPets)
  }
}
