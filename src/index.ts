import express from "express";
import mysql from "mysql2";
import * as dotenv from "dotenv";
import { Horse } from "./Horse";

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

app.get("/horses/id/:id", (req: express.Request, res: express.Response) => {
    const query = `SELECT * FROM horse WHERE ID = ${req.params.id};`;
    connection.query(query, (err, result: Horse[]) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error retrieving data from database");
        } else {
            res.status(200).json(result[0]);
        }
    });
});

app.get("/horses/search", (req: express.Request, res: express.Response) => {
    var query =
        `SELECT * FROM horse WHERE name like "%` + req.query.name + `%"`;
    if (req.query.belong) query += `and belong = "` + req.query.belong + `"`;
    if (req.query.owner) query += `and owner = "` + req.query.owner + `"`;
    if (req.query.color) query += `and color = "` + req.query.color + `"`;
    connection.query(query, (err, result: Horse[]) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error retrieving data from database");
        } else {
            res.status(200).json(result);
        }
    });
});

app.get("/races", (_, res: express.Response) => {
    const query = "SELECT * FROM races;";
    connection.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error retrieving data from database");
        } else {
            res.status(200).json(result);
        }
    });
});

app.get("/races/id/:id", (req: express.Request, res: express.Response) => {
    const query = `SELECT * FROM races where id = "` + req.params.id + `";`;
    connection.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error retrieving data from database");
        } else {
            res.status(200).json(result);
        }
    });
});

app.listen(3001, () => console.log("Server is running"));
