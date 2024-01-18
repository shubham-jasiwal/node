// // import http from "http"
// import http from "http"
// import { randomnumber } from "./feature.js";
// import fs from 'fs';



// const server = http.createServer((req, res) => {
//     if (req.url === "/shubham"){
//       return res.end(`<h1>Are bahut Jagah Hai</h1> ${randomnumber()}`);
//     }
//     if (req.url === "/file"){
//         fs.readFile("test.html",(err,data)=>{
//             return res.end(data);
//          });
//       }
//     console.log("sever strated");
// });
// console.log("hello world");

// server.listen(5000,() => {
//     console.log("hello boy");
   
// });

import  express from "express";
import path from "path";

import bodyParser from "body-parser";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import router from "./routes.js";
import client from "./mongo.js";
import s from "./postgres.js";
import User from "./user_model.js";
import { noway } from "./user_model.js";

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);
await client.connect();
try {
    await s.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

app.get('/getmovies', function(req, res) {
    res.json({
        success:true,
        movies:['sanju','3 idiots','jawan','12th fail','abcd'],
    });
});

app.get('/login', function(req, res) {
    console.log(path.join(__dirname + "/login.html"));
    res.sendFile(path.join(__dirname + "/login.html"));
});

app.get('/register', function(req, res) {
    console.log(path.join(__dirname + "/register.html"));
    res.sendFile(path.join(__dirname + "/register.html"));
});

app.get('/logout', function(req, res) {
    console.log(path.join(__dirname + "/logout.html"));
    res.sendFile(path.join(__dirname + "/logout.html"));
});

// app.post('/api/login', function(req, res) {
//        console.log("name")
//        console.log(req.body);
//        console.log(req.body.name);
//        res.end("<h1>Registered Succesfully</h1>");
// });

app.listen(5000,() => {
    console.log("listening on port")
});

app.post('/api/rest/login', function(req, res) {
    const name = req.body.name;
    res.json({
        success: true,
        name: name
    });
});

const users = [
    {
        id: 1,
        name: 'shubham'
    },
    {
        id: 2,
        name: 'adarsh'
    },
    {
        id: 3,
        name: 'ironman'
    }
]

export default users;

// app.get('/users',)

// Route to handle HTTP POST requests



// console.log(movies);
// const doc = {
//     name: "adarsh",
//     content: "No bytes, no problem. Just insert a document, in MongoDB",
//   }
//   // Insert the defined document into the "haiku" collection
//   const result = await movies.insertOne(doc);

await User.sync({ force: true });
console.log("The table for the User model was just (re)created!");


// await s.sync({ force: true });
// console.log("All models were synchronized successfully.");


// await noway.drop();
// console.log("User table dropped!");

