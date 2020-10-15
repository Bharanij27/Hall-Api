var express = require("express");
var router = express.Router();
const bcryptjs = require('bcryptjs');
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const url = process.env.mongodbURL || "mongodb://localhost:27017/";
const jwt = require('jsonwebtoken');
const { sendMail } = require("../../common/mailesender");

router.post("/newUser", async function (req, res, next) {
    let client;
    try {
        client = await mongoClient.connect(url);
        let db = client.db("zenClass");
        let {
            email,
            name,
            password,
            phoneNum
        } = req.body;
        
        let existing = await db.collection("user-details").findOne({
            email: email,
        });

        if (existing) {
            res.json({
                status: 500,
                message: "E-mail id already exist....please Login",
            });
        } else {
            let salt = bcryptjs.genSaltSync(10);
            let hashedPassword = bcryptjs.hashSync(password, salt)
            password = hashedPassword;
            await db.collection("user-details").insertOne({
                email,
                name,
                password,
                phoneNum
            });
            res.json({
                status: 200,
                message: "Success",
            });
        }
        client.close();
    } catch (error) {
        client.close();
        res.json({
            status: 404,
            error,
            message: "Something went wrong in server",
        });
    }
});

router.post("/", async function (req, res, next) {
    let client;
    try {
        client = await mongoClient.connect(url);
        let db = client.db("zenClass");
        let {
            email,
            password
        } = req.body;

        let existing = await db.collection("user-details").findOne({
            email: email
        });
        
        if (!existing) {
            res.json({
                status: 404,
                message: "No such user exists",
            });
        } else {
            let comparedResult = await bcryptjs.compare(password, existing.password)
            
            if (!comparedResult) {
                res.json({
                    status: 500,
                    message: "Password did not match",
                });
            } else {
                let token = jwt.sign({id : email}, "secret key");
                
                res.json({
                    status: 200,
                    message: "Valid User",
                    token
                });
            }
            client.close();
        }
    } catch (error) {
        client.close();
        res.json({
            status: 404,
            message: "Something went wrong in server",
        });
    }
});

router.post("/userDetails", async function (req, res, next) {
    let client;
    try {
        client = await mongoClient.connect(url);
        let db = client.db("zenClass");
        let {
            token
        } = req.body;        
        let user = jwt.verify(token, 'secret key');
        let userDetail = await db.collection("user-details").findOne({
            email: user.id,
        });

        if (userDetail) {
            res.json({
                status: 200,
                userDetail,
            });
        } else {
                res.json({
                    status: 404,
                    message: "No details found on requested user",
                });
            client.close();
        }
    } catch (error) {
        client.close();
        res.json({
            status: 500,
            error,
            message: "Something went wrong in server",
        });
    }
});

router.post("/sendMail", async function (req, res, next) {
    let client;
    let resetkey = Math.random().toString(20).substr(2, 8);

    let salt = bcryptjs.genSaltSync(10);
    let hashedPassword = bcryptjs.hashSync(resetkey, salt)
    let password = hashedPassword;

    try {
        client = await mongoClient.connect(url);
        let db = client.db("zenClass");

        let userInfo = await db.collection("user-details").findOneAndUpdate({
            email: req.body.email
        }, {
            $set: {
                password: password
            }
        });
        client.close();

        if (userInfo.value) {
            let mail = sendMail(req.body.email, resetkey);
                if(mail){
                res.json({
                    status: 200,
                    message: "mail sent"
                })
            }
            else throw mail
        } else {
            res.json({
                status: 404,
                message: "No such e-mail id is registered with our database"
            })
        }
    } catch (error) {
        res.json({
            status: 404,
            message: 'error'
        })
    }
});

router.post("/updatePass", async function (req, res, next) {
    let client;
    let {password, token} = req.body
    let salt = bcryptjs.genSaltSync(10);
    let hashedPassword = bcryptjs.hashSync(password, salt)
    password = hashedPassword;
    let email = jwt.verify(token, 'secret key').id;
    
    try {
        client = await mongoClient.connect(url);
        let db = client.db("zenClass");

        let userInfo = await db.collection("user-details").findOneAndUpdate({
            email: email
        }, {
            $set: {
                password: password
            }
        });
        client.close();

        if (userInfo.value) {
            res.json({
                status: 200,
                message: "Password Updated"
            })
        } else {
            res.json({
                status: 404,
                message: "No such e-mail id is registered with our database"
            })
        }
    } catch (error) {
        res.json({
            status: 404,
            message: 'error'
        })
    }
});


module.exports = router;