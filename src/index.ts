import express from "express";
import mysql from "mysql2";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    port: 3306,
});

app.get("/horses", (_, res: express.Response) => {
    const query = "SELECT * FROM horse;";
    connection.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error retrieving data from database");
        } else {
            res.status(200).json(result);
        }
    });
});

app.listen(3301, () => console.log("Server is running"));
