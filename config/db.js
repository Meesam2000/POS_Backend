const mysql = require("mysql2");

const db = mysql.createConnection({
    user: process.env.USER,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT
});


async function connectDb() {
    await db.connect((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Connection successfully establish!!!! ");
        }
    });
}

connectDb()

module.exports = db