require('dotenv').config()
const mariadb=require('mariadb')

const connection =mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
})

// connection.getConnection()
// .then(conn => {
//   conn.query("SELECT * FROM students")
//     .then(rows => {
//       console.log(rows);
//       conn.release(); // release connection when done
//     })
//     .catch(err => {
//       conn.release(); // release connection when there's an error
//       throw err;
//     })
// })
// .catch(err => {
//   console.log("Error connecting to database:", err);
// });
 

module.exports = connection;