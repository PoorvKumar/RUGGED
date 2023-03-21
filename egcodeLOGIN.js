const express = require('express');
const app = express();
require("dotenv").config();
const port = 3004;
var md5 = require('md5')
var sqlite3 = require('sqlite3').verbose()
const cors = require('cors');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const DBSOURCE = "usersdb.sqlite";
const auth = require("./middleware");

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    } 
    else {        
        var salt = bcrypt.genSaltSync(10);
        
        db.run(`CREATE TABLE Users (
            Id INTEGER PRIMARY KEY AUTOINCREMENT,
            Username text, 
            Email text, 
            Password text,             
            Salt text,    
            Token text,
            DateLoggedIn DATE,
            DateCreated DATE
            )`,
        (err) => {
            if (err) {
                // Table already created
            } else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO Users (Username, Email, Password, Salt, DateCreated) VALUES (?,?,?,?,?)'
                db.run(insert, ["user1", "user1@example.com", bcrypt.hashSync("user1", salt), salt, Date('now')])
                db.run(insert, ["user2", "user2@example.com", bcrypt.hashSync("user2", salt), salt, Date('now')])
                db.run(insert, ["user3", "user3@example.com", bcrypt.hashSync("user3", salt), salt, Date('now')])
                db.run(insert, ["user4", "user4@example.com", bcrypt.hashSync("user4", salt), salt, Date('now')])
            }
        });  
    }
});


module.exports = db

app.use(
    express.urlencoded(),
    cors({
        origin: 'http://localhost:3000'
    })
);

app.get('/', (req, res) => res.send('API Root'));


// * R E G I S T E R   N E W   U S E R

app.post("/api/register", async (req, res) => {
    var errors=[]
    try {
        const { Username, Email, Password } = req.body;

        if (!Username){
            errors.push("Username is missing");
        }
        if (!Email){
            errors.push("Email is missing");
        }
        if (errors.length){
            res.status(400).json({"error":errors.join(",")});
            return;
        }
        let userExists = false;
        
        
        var sql = "SELECT * FROM Users WHERE Email = ?"        
        await db.all(sql, Email, (err, result) => {
            if (err) {
                res.status(402).json({"error":err.message});
                return;
            }
            
            if(result.length === 0) {                
                
                var salt = bcrypt.genSaltSync(10);

                var data = {
                    Username: Username,
                    Email: Email,
                    Password: bcrypt.hashSync(Password, salt),
                    Salt: salt,
                    DateCreated: Date('now')
                }
        
                var sql ='INSERT INTO Users (Username, Email, Password, Salt, DateCreated) VALUES (?,?,?,?,?)'
                var params =[data.Username, data.Email, data.Password, data.Salt, Date('now')]
                var user = db.run(sql, params, function (err, innerResult) {
                    if (err){
                        res.status(400).json({"error": err.message})
                        return;
                    }
                  
                });           
            }            
            else {
                userExists = true;
                // res.status(404).send("User Already Exist. Please Login");  
            }
        });
  
        setTimeout(() => {
            if(!userExists) {
                res.status(201).json("Success");    
            } else {
                res.status(201).json("Record already exists. Please login");    
            }            
        }, 500);


    } catch (err) {
      console.log(err);
    }
})


// * L O G I N

app.post("/api/login", async (req, res) => {
  
  try {      
    const { Email, Password } = req.body;
        // Make sure there is an Email and Password in the request
        if (!(Email && Password)) {
            res.status(400).send("All input is required");
        }
            
        let user = [];
        
        var sql = "SELECT * FROM Users WHERE Email = ?";
        db.all(sql, Email, function(err, rows) {
            if (err){
                res.status(400).json({"error": err.message})
                return;
            }

            rows.forEach(function (row) {
                user.push(row);                
            })
            
            var PHash = bcrypt.hashSync(Password, user[0].Salt);
       
            if(PHash === user[0].Password) {
                // * CREATE JWT TOKEN
                const token = jwt.sign(
                    { user_id: user[0].Id, username: user[0].Username, Email },
                      process.env.TOKEN_KEY,
                    {
                      expiresIn: "1h", // 60s = 60 seconds - (60m = 60 minutes, 2h = 2 hours, 2d = 2 days)
                    }  
                );

                user[0].Token = token;

            } else {
                return res.status(400).send("No Match");          
            }

           return res.status(200).send(user);                
        });	
    
    } catch (err) {
      console.log(err);
    }    
});

  
// * T E S T  

app.post("/api/test", auth, (req, res) => {
    res.status(200).send("Token Works - Yay!");
});


app.listen(port, () => console.log(`API listening on port ${port}!`));