import express from "express";
import expressBasicAuth from "express-basic-auth";
import mysql from "mysql2";
import * as dotenv from "dotenv";
import { Horse, Race } from "./Horse";

dotenv.config();

const password = process.env.DB_PASS || "Fuck";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    expressBasicAuth({
        users: {
            kradmin: password,
        },
    })
);

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

app.get(
    "/races/id/:id/horses",
    (req: express.Request, res: express.Response) => {
        const query = `SELECT * FROM races where id = "` + req.params.id + `";`;
        connection.query(query, (err, result: Race[]) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error retrieving data from database");
            } else {
                const horse_code = result[0].code
                    .substring(3, 39)
                    .match(/.{3}/g)
                    ?.join(", ");
                console.log(horse_code);
                const query2 =
                    `SELECT * FROM horse WHERE id in (` + horse_code + `);`;
                connection.query(query2, (err, result2) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send(
                            "Error retrieving data from database"
                        );
                    } else {
                        res.status(200).json(result2);
                    }
                });
            }
        });
    }
);

app.get("/races/search", (req: express.Request, res: express.Response) => {
    const query =
        `SELECT * FROM races where name like "%` + req.query.name + `%"`;
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
