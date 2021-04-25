// dbService.js is used to connect to our database and let us make queries to the database.

const mysql = require('mysql');
const dotenv = require('dotenv');
const { response } = require('express');
let instance = null;
dotenv.config();

/* 
Creating connection to the database with our .env file.
Below is an example of content inside .env file.

PORT=5000
USER=admin
PASSWORD=test123
DATABASE=utappointment
DB_PORT=3306
HOST=localhost
SESSION_SECRET=secret
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
    console.log('db ' + connection.state);
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

    async insertNewName(name) {
        try {
            const dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO names (name, date_added) VALUES (?,?);";

                connection.query(query, [name, dateAdded] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });
            return {
                id : insertId,
                name : name,
                dateAdded : dateAdded
            };
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
   // Using a async to get our appointment info
    async getAppointmentInfo(st_fname, st_lname, st_email, app_date, app_time) {
        try {
            // Creating a new promise in which will handle our query.
            // We will either resolve or reject the query.
            // If rejected, will go into catch block.
            const response = await new Promise((resolve, reject) => {
                // The query statement. 
                const query = "SELECT * FROM appointment WHERE st_fname = ? AND st_lname = ? AND st_email = ? AND app_date = ? AND app_time = ? ORDER BY ref_num DESC";
                // To parameterize data selection:
                // const query = "SELECT * FROM appointments WHERE id = ?";

                connection.query(query, [st_fname, st_lname, st_email, app_date, app_time], (error, results) => {
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

    async getAppointmentStatus(ref_num, st_email) {
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT ref_num, st_fname, st_lname, app_date, app_time FROM appointment WHERE ref_num = ? AND st_email = ? ORDER BY ref_num DESC";
                connection.query(query, [ref_num, st_email], (error, results) => {

                    if (error) reject(new Error(error.message));
                    resolve(results);
                });
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getAppointmentData() {
        try {
            const currentDate = new Date();

            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM appointment WHERE app_date >= ? ORDER BY app_date ASC, app_time ASC ";
                connection.query(query, [currentDate], (error, results) => {
                    if (error) reject(new Error(error.message));
                    resolve(results);
                });
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    // Using async to get our office hours availability
    async getAvailabilityData() {
        try {
            // Creating a new promise in which will handle our query.
            // We will either resolve or reject the query.
            // If rejected, will go into catch block.
            const response = await new Promise((resolve, reject) => {
                // The query statement.
                const query = "SELECT * FROM availability";
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

    async getBookedSpots() {
        try {
            const today = new Date();
            // Creating a new promise in which will handle our query.
            // We will either resolve or reject the query.
            // If rejected, will go into catch block.
            const response = await new Promise((resolve, reject) => {
                // The query statement.
                const query = "SELECT app_date, app_time FROM appointment WHERE app_date > ?";
                // To parameterize data selection:
                // const query = "SELECT * FROM appointments WHERE id = ?";

                connection.query(query, [today], (error, results) => {
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

    // Using async to get our instructor information
    async getInstructorData() {
        try {
            // Creating a new promise in which will handle our query.
            // We will either resolve or reject the query.
            // If rejected, will go into catch block.
            const response = await new Promise((resolve, reject) => {
                // The query statement.
                const query = "SELECT * FROM instructor";
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

    async insertAvailabilityData(day, start_time, end_time) {
        try {            
            // Creating a new promise in which will handle our query.
            // We will either resolve or reject the query.
            // If rejected, will go into catch block.
            const response = await new Promise((resolve, reject) => {
                // The query statement.
                const query = "INSERT INTO availability VALUES (?, ?, ?);";
            
                connection.query(query, [ day, start_time, end_time], (err, result) => {
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

    async insertAppointment(st_fname, st_lname, st_email, app_date, app_time) {
        try {  
            const fname = st_fname;  
            const lname = st_lname;
            const email = st_email;
            const date = app_date;
            const time = app_time;        
            // Creating a new promise in which will handle our query.
            // We will either resolve or reject the query.
            // If rejected, will go into catch block.
            //********************** need to reformat the date to be inserted in the database
            const response = await new Promise((resolve, reject) => {
                // The query statement.
                const query = `INSERT INTO appointment (st_fname, st_lname, st_email, app_date, app_time, app_timestamp) VALUES (?,?,?,?,?,NOW());`;
            
                connection.query(query, [st_fname, st_lname, st_email, app_date, app_time], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);  
                    console.log(result);  
                });
            });
        
            return {fname : fname,
                    lname : lname,
                    email : email,
                    date : date,
                    time : time};
        } catch (error) {
            console.log(error);
            return { success : false};
        }
    }

    async register(fname, lname, email, username, hashedPassword) {
        try {            
            // Creating a new promise in which will handle our query.
            // We will either resolve or reject the query.
            // If rejected, will go into catch block.
            const response = await new Promise((resolve, reject) => {
                // The query statement.
                const query = `INSERT INTO instructor VALUES (?,?,?,?,?);`;
            
                connection.query(query, [fname, lname, email, username, hashedPassword], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve('Success');  
                    //console.log(result);  
                });
            });
        
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async deleteOfficeHoursByDay(day) {
        try {
            day = parseInt(day, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM availability WHERE day = ?";
    
                connection.query(query, [day] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
            
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async deleteRowByRefNum(ref_num) {
        try {
            ref_num = parseInt(ref_num, 10);
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM appointment WHERE ref_num = ?";
    
                connection.query(query, [ref_num] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}




// Export our Dbservice class
module.exports = DbService;