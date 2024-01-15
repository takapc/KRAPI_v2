"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_basic_auth_1 = __importDefault(require("express-basic-auth"));
const mysql2_1 = __importDefault(require("mysql2"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const password = process.env.DB_PASS || "Fuck";
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_basic_auth_1.default)({
    users: {
        kradmin: password,
    },
}));
const connection = mysql2_1.default.createConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    port: 3306,
});
console.log(process.env.DB_USER);
app.get("/horses", (_, res) => {
    const query = "SELECT * FROM horse;";
    connection.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error retrieving data from database");
        }
        else {
            res.status(200).json(result);
        }
    });
});
app.get("/horses/id/:id", (req, res) => {
    const query = `SELECT * FROM horse WHERE ID = ${req.params.id};`;
    connection.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error retrieving data from database");
        }
        else {
            res.status(200).json(result[0]);
        }
    });
});
app.get("/horses/search", (req, res) => {
    var query = `SELECT * FROM horse WHERE name like "%` + req.query.name + `%"`;
    if (req.query.belong)
        query += `and belong = "` + req.query.belong + `"`;
    if (req.query.owner)
        query += `and owner = "` + req.query.owner + `"`;
    if (req.query.color)
        query += `and color = "` + req.query.color + `"`;
    connection.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error retrieving data from database");
        }
        else {
            res.status(200).json(result);
        }
    });
});
app.get("/races", (_, res) => {
    const query = "SELECT * FROM races;";
    connection.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error retrieving data from database");
        }
        else {
            res.status(200).json(result);
        }
    });
});
app.get("/races/id/:id", (req, res) => {
    const query = `SELECT * FROM races where id = "` + req.params.id + `";`;
    connection.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error retrieving data from database");
        }
        else {
            res.status(200).json(result);
        }
    });
});
app.get("/races/search", (req, res) => {
    const query = `SELECT * FROM races where name like "%` + req.query.name + `%"`;
    connection.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error retrieving data from database");
        }
        else {
            res.status(200).json(result);
        }
    });
});
app.listen(3001, () => console.log("Server is running"));
//# sourceMappingURL=index.js.map