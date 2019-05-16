module.exports = {
  friendlyName: 'Upload place images',

  description: 'Update place with its images',

  inputs: {
    id: {
      type: 'string',
      required: true,
      custom: value => sails.helpers.validators.objectidValidator(value)
    }
  },

  exits: {
    notFound: {
      responseType: 'notFound'
    }
  },

  fn: async function (inputs, exits) {
    const { id } = inputs

    const pet = await Pet.findOne({ id })
    if (!pet) { throw 'notFound' }

    const images = this.req.file('images')
    const uploadedImages = await sails.helpers.uploadFilesCloudinary('pet', id, images)

    const imagesModel = await Promise.all(uploadedImages.map(image =>
      Image.create({
        url: image.secure_url,
        data: image
      }).fetch()
    ))

    await Pet.replaceCollection(id, 'images').members(imagesModel.map(img => img.id))

    const updatedPet = await sails.helpers.pet.deepPopulateById(id)
    return exits.success(updatedPet)
  }
}
