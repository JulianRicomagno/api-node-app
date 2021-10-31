// const Atraccion = {
//     '_id': 'ObjectId',
//     'name': 'String',
//     'image': 'Path',
//     'rating': 'Number',
//     'dateAndHour' : 'Date',
//     'location': 'String ejes x y',
//     'address': 'String',
//     'description': 'String',
//     'type': 'String',
//     'createdAt': 'Date',
//     'updatedAt': 'Date',
//     'status' : 'String'
// }

const {Schema, model, Types} = require('mongoose');

const AttractionSchema = Schema({
    id: {
        type: String,
        required: [true, "id is required"]
    },
    type: {
        type: String,
        required: [true, "type is required"]
    },
    name: {
        type: String,
        required: [true, "type is required"]
    },
    description: {
        type: String,
        required: [true, "type is required"]
    },
    typeAttraction: {
        type: String,
        required: [true, "type is required"]
    },    
});

module.exports = model('Attraction', AttractionSchema);