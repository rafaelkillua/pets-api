module.exports = {
  friendlyName: 'Deep populate Pet',

  description: 'Get a single pet deep populated',

  inputs: {
    id: {
      type: 'string',
      required: true
    }
  },

  exits: {},

  fn: async function (inputs, exits) {
    const { id } = inputs

    const pet = await Pet.findOne({ id }).populate('owner').populate('species').populate('address').populate('images')

    const ownerCity = await City.findOne({ id: pet.owner.city })
    pet.owner.city = ownerCity
    const ownerState = await State.findOne({ id: pet.owner.city.state })
    pet.owner.city.state = ownerState
    delete pet.owner.accessLevel
    const city = await City.findOne({ id: pet.address.city })
    pet.address.city = city
    const state = await State.findOne({ id: pet.address.city.state })
    pet.address.city.state = state

    return exits.success(pet)
  }
}
