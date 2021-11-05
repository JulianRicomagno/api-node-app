// const Turista = {
//     // Primer Paso registro user.
//     '_id': 'ObjectId',
//     'userName': 'String',
//     'passwd': 'String',
//     'email': 'String',
//     'createdAt': 'Date',
//     'updatedAt': 'Date',
//     'role': 'ObjectId',
//     'status' : 'Boolean',
//     'languagePreference' : 'ObjectId',
    // Segundo paso completar datos para DataAnalitycs
//     'generalInfo': {
//         'name': 'String',
//         'lastName': 'String',
//         'age': 'Number',
//         'nationality': 'String',
//         'country': 'String',
//         'city': 'String',
//         'gender': 'ObjectId',
//     },
    // Tercer paso se le pide dias que va a estar y se crea itinerario con array de Atraccion por dia.
    // Suponiendo que va el 5/10 hasta el 10/10
//     'itinerary': {
//         'hotel': 'String',
//         'dayFrom': 'Date',
//         'dayTo': 'Date',
//         'totalDays' :[ Es un Array de dias. Adentro tiene un Array de atracciones.
//                 {
//                 'attendanceDate': "2021-10-05",
//                 'isDayOff' : 'Boolean',
//                 'attraction': [{
//                     'time': 'Date',
//                     '_id': 'ObjectId',
//                     'name': 'String',
//                     'image': 'Path',},
//                 ]
//             },
//             {
//                 "attendanceDate": "2021-10-06"
//             },
//     ]
// }
// }

const {Schema, model} = require('mongoose');

const UserSchema = Schema({
    name: {
        type: 'string',
        required: [true, 'name is required']
    },
    email: {
        type: 'string',
        required: [true, 'email is required'],
        unique: true
    },
    passwd: {
        type: 'string',
        required: [true, 'password is required'],
    }
});

 UserSchema.methods.toJSON = function () {
     const { __v, passwd, ...user } = this.toObject();
    return user;
 }

module.exports = model('User', UserSchema);