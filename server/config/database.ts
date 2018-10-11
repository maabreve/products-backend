/**
 * Database Configuration
 */
import  mongoose =  require("mongoose");

class Database {
    private uri = 'mongodb://super_user:macacoveio10@ds125073.mlab.com:25073/pruducts';
    private connection: any;

    constructor(mongoose: mongoose.Mongoose) { 
        mongoose.Promise = global.Promise;
        this.connection = mongoose.connect(this.uri, { useMongoClient: true });
    }

    closeConnection(message: string, callback: any) {
        this.connection.close(() => {
            console.log(`Mongoose was desconeted by: ${message}`)
            callback();
        });
    }

}

export default Database;
