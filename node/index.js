//File System Module

// const fileSystem = require("fs");

// fileSystem.writeFile("noddy.txt", "Aa gya noddy", (err,result) => {
//      if (err) {
//     console.log("Error Occured " + err);
// }
// });

// fileSystem.unlink("noddy.txt", (err,result) => {
//     if (err) {
//         console.log("Error Occured " + err);
//     }
// });

// fileSystem.mkdir("f8th", (err,result) => {
//     if (err) {
//         console.log("Error Occured " + err);
//     }
// });

// fileSystem.rmdir("f8th", (err,result) => {
//     if (err) {
//         console.log("Error Occured " + err);
//     }
// });


//Operating System Module

// const operatingSystem = require("os");
// console.log(operatingSystem.arch());

//HTTP Module

// const http = require("http");
// http.createServer((req, res) => {
//     console.log(req.headers);
//     res.end("End the responce");
// }).listen(3000);

// ----------------------------------------------------------------------------------------------

//REST API

//RE = Representational
//S = State
//T = Transfer

//Representing data by sharing after processing it

//A = Application
//P = Protocol
//I = Interface

// Express framework
//#Framework is a collection of features that helps us to develop a web application in minimum time with less code

//#Librarary is a bundle of code

//Express is a framework of Node.js

const express = require("express");
 //Initialize express
 const app = express();
 app.use(express.json());

//HTTPS METHODS -> GET POST PUT DELETE
//GET -> To get data from server
//POST -> To send data to server
//PUT -> To update data on server
//DELETE -> To delete data from server

 app.get("/", (req,res) => {
    return res.json({message: "Hello World"});  
 })

app.get("/b/:id", (req, res) => {
    const students = [
        {
            id: 1,
            name: "student1"
        },
        {
            id: 2,
            name: "student2"
        },
        {
            id: 3,
            name: "student3"
        },
        {
            id: 4,
            name: "student4"
        },
        {
            id: 5,
            name: "student5"
        }
    ]

    const studentID = req.params.id;
    const getStudent = students.filter((student) => student.id === parseInt(studentID));
    return res.json({data: getStudent});
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})