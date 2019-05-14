module.exports = {
  friendlyName: 'Upload image on cloudinary',

  inputs: {
    object: {
      type: 'string',
      required: true
    },

    id: {
      type: 'string',
      required: true
    },

    file: {
      type: 'ref',
      required: true
    }
  },

  exits: {},

  fn: async function (inputs, exits) {
    const uploadFile = (object, id, file) => {
      return new Promise((resolve, reject) => {
        file.upload({
          adapter: require('skipper-cloudinary'),
          key: process.env.CLOUDINARY_KEY,
          secret: process.env.CLOUDINARY_SECRET,
          cloudName: process.env.CLOUDINARY_NAME,
          uploadOptions: {
            folder: `${object}/${id}`,
            'resource_type': 'image',
            maxTimeToBuffer: 4500,
            eager: [
              { width: 400, height: 400 }
            ]
          }
        }, (error, uploadedFiles) => {
          if (error) { return reject(error) }
          if (uploadedFiles.every(file => file && file.extra)) {
            resolve(uploadedFiles.map(file => file.extra))
          } else {
            return reject(new Error('Falha no upload'))
          }
        }).on('progress', args => {
          sails.log.debug('loaded:', args.percent)
        })
      })
    }

    const { object, id, file } = inputs
    let fileUploaded = await uploadFile(object, id, file)
    return exits.success(fileUploaded)
  }
}
