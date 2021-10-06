const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;

class Mongoose{
    static async dbConnection() {
        try {
            mongoose.connect(MONGODB_URI, {
                useUnifiedTopology: true,
                useNewUrlParser: true
            });

            console.log('Database is connected')

        } catch (error) {
            throw new Error('Failed to start database');
        }
    }
}

module.exports = Mongoose;