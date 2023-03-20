const express = require('express');
const app = express();
require("dotenv").config();
const port = 3004;
var md5 = require('md5')
const db=require('./customerTables')
const cors = require('cors');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const DBSOURCE = "usersdb.sqlite";
const auth = require("./middleware");
const router = express.Router();
router.post("/api/register", async (req, res) => {
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
module.exports=router;