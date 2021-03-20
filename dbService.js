// dbService.js is used to connect to our database and let us make queries to the database.

const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

/* 
Creating connection to the database with our .env file.
Below is an example of content inside .env file.

PORT=5000
USER=admin
PASSWORD=test123
DATABASE=utappointments
DB_PORT=3306
HOST=localhost
*/
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

// Attempts to connect to the database and logs connection state.
connection.connect((error) => {
    if  (error) {
        console.log(error.message);
    }
    console.log('db' + connection.state);
});

// This class contains all the functions used to insert, delete, get data.
class DbService {
    // This static function used to get instance if there exists. If not, we can create one. We only want one instance of this class.
    static getDbServiceInstance() {
        // Ternary operator which says 'if instance exists, return the instance, else, create new instance'.
        return instance ? instance : new DbService();
    }

    // Using a async to get our data
    async getAllData() {
        try {
            // Creating a new promise in which will handle our query.
            // We will either resolve or reject the query.
            // If rejected, will go into catch block.
            const response = await new Promise((resolve, reject) => {
                // The query statement.
                const query = "SELECT * FROM appointment";
                // To parameterize data selection:
                // const query = "SELECT * FROM appointments WHERE id = ?";

                connection.query(query, (error, results) => {
                    if (error) reject(new Error(error.message));
                    resolve(results.response);
                });
                // To parameterize data selection:
                // connect.query(query, [id]);
            });

            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    // Using a async to get our appointment keys
    async getKeysData() {
        try {
            // Creating a new promise in which will handle our query.
            // We will either resolve or reject the query.
            // If rejected, will go into catch block.
            const response = await new Promise((resolve, reject) => {
                // The query statement.
                const query = "SELECT * FROM app_keys";
                // To parameterize data selection:
                // const query = "SELECT * FROM appointments WHERE id = ?";

                connection.query(query, (error, results) => {
                    if (error) reject(new Error(error.message));
                    resolve(results);
                });
                // To parameterize data selection:
                // connect.query(query, [id]);
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }


    async updateKeyData(app_key) {
        try {
            
            // Creating a new promise in which will handle our query.
            // We will either resolve or reject the query.
            // If rejected, will go into catch block.
            const response = await new Promise((resolve, reject) => {
                // The query statement.
                const query = "UPDATE app_keys SET app_key = (?);";
            
                connection.query(query, [app_key], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);  
                    console.log(result);  
                });
            });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

// Export our Dbservice class
module.exports = DbService;