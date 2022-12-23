
const mysql = require('mysql2');
const { response } = require("express");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

app.set("view engine", "ejs")

app.use(express.static("static"))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// 
app.get("/", function (req, res) {
    res.render("index")
    console.log('index is working')


})
app.get("/signup", function (req, res) {
    res.render("signup")
    console.log('signup is working')
})


app.get("/login", function (req, res) {
    res.render("login")
    console.log('login is working')
})

app.get("/templates", function (req, res) {
    res.render("templates")
    console.log('templates is working')

})

app.get("/formule1", function (req, res) {
    res.render("formule1")
    console.log('formule1 is working')


})

app.get("/formule2", function (req, res) {
    res.render("formule2")
    console.log('formule2 is working')


})

// create a connection between MySql and NodeJS
const conn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'Izjz5699@#',
    database : 'signup-nodejs'
 });

conn.connect((error)=>{
    if (error) {
        throw error;
    } else{
    console.log('Connected')
}
 });

// Cheking email and password
 app.post("/login", function(req,res){
    const { email, password} = req.body;
    conn.query("SELECT * FROM signup WHERE email = ? and password = ?",[email,password],function(error,results,fields){
        if (results?.length > 0) {
            res.redirect("templates", 301);
        } 
       else{
            res.send("email or Password doesn't exist")
           
        }
    });
    
    
});

// Create a Table 
app.post("/register", function(req,res){
    const { fullname, email, password} = req.body;
    conn.query('INSERT INTO signup SET ?', {username:fullname , email: email, password: password},(error,results) =>{
        if (error) {
            console.log(error);
        } else {
            console.log(results);
        }

    })

    res.render("index")
});

app.listen(3000)

