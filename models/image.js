/* Image mongoose model
* Original code segment is taken from the CSC309 cloudinary-mongoose-react example
* Modified by team 16 as needed
* */
const mongoose = require('mongoose');

// create an image schema
const ImageSchema = mongoose.Schema({
    imageId: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    createdAt: String
});

// create an image model using the schema
const Image = mongoose.model('Image', ImageSchema, 'Images');

module.exports = { Image };