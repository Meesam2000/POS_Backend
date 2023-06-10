const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("../config/nodemailer")
require("dotenv").config();
const db = require("../config/db")
const saltRound = 10;
const account = {
    signup(obj) {
        return new Promise(function (resolve, reject) {
            const fname = obj.firstName;
            const lname = obj.lastName;
            const phone = obj.phone;
            const gmail = obj.gmail;
            const password = obj.password;
            const company = obj.company;
            bcrypt.hash(password, saltRound, (err, hash) => {
                if (!err) {
                    const token = jwt.sign({ gmail }, "login");
                    console.log("------JWTtoken--------", token);
                    db.query(
                        "INSERT INTO accounts (fname,lname,phone,email,password,company,confirmationcode) VALUES (?,?,?,?,?,?,?)", [fname, lname, phone, gmail, hash, company, token],
                        (err, result) => {
                            if (err) {
                                reject(err)
                            } else {
                                nodemailer.sendConfirmationEmail(
                                    fname + lname,
                                    gmail,
                                    token
                                );
                                resolve(true)
                            }
                        }
                    );
                }
            });
        })
    },

    login(obj) {
        console.log(obj);
        return new Promise(function (resolve, reject) {

            const username = obj.username;
            const password = obj.password;
            console.log("------username------", username);
            console.log("----------password--------", password);
            db.query("SELECT * FROM accounts where email=?;", username, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err)
                } else if (result.length == 0) {
                    console.log("No value");
                    reject(err)
                } else if (result.length > 0) {
                    console.log("-------result--------",result);
                    bcrypt.compare(password, result[0].password, (error, resp) => {
                        if (resp) {
                            console.log("password matched");
                            resolve(result)
                        } else if (error) {
                            reject(error)
                        }
                    });
                }
            });
        })
    },

    // login(){
    //     if (req.session.user) {
    //         res.send({ loggedIn: true, user: req.session.user });
    //     } else {
    //         res.send({ loggedIn: false });
    //     }
    // },



    update(obj1, filename) {
        const obj = JSON.parse(JSON.stringify(obj1))
        return new Promise(function (resolve, reject) {
            db.query(
                "UPDATE accounts set fname=?, lname=? ,phone=?, company=?, profileimage=? where email=?", [obj.firstName, obj.lastName, obj.phone, obj.company, filename, obj.email],
                (err, result) => {
                    if (err) {
                        reject(false)
                    } else {
                        resolve(true)
                    }
                }
            );
        })
    },



    verifyUser(obj) {
        return new Promise(function (resolve, reject) {
            const confirmationCode = obj.token;
            db.query("SELECT * FROM accounts where confirmationcode=?;", confirmationCode, (err, result) => {
                if (!err) {
                    const status = "active";
                    db.query(
                        "UPDATE `pos`.`accounts` SET status=? where confirmationcode=?", [status, confirmationCode],
                        (err, result) => {
                            if (err) {
                                reject(false)
                            } else {
                                resolve(true)
                            }
                        }

                    );
                }
            });
        })
    },


    getUser(obj) {
        return new Promise(function (resolve, reject) {
            const gmail = obj.gmail;
            db.query("SELECT * FROM accounts where email=?;", gmail, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err)
                } else if (result.length == 0) {
                    console.log("Not found");
                    reject(err)
                } else if (result.length > 0) {
                    if (result[0].status == 'active') {
                        const id = result[0].id;
                        let passwordResetCode = Math.floor(Math.random() * 90000) + 10000;
                        // const token = jwt.sign({ id }, "login", { expiresIn: 120 });
                        db.query(
                            "UPDATE accounts set token=? where email=?", [passwordResetCode, gmail],
                            (err, result2) => {
                                if (err) {
                                    console.log(err)
                                    reject(err)
                                } else {
                                    nodemailer.sendToken(
                                        result[0].fname + " " + result[0].lname,
                                        gmail,
                                        passwordResetCode
                                    );
                                    resolve(result2)
                                }
                            }
                        );
                    }
                }
            })
        });
    },



    confirmToken(obj) {
        return new Promise(function (resolve, reject) {
            const token = obj.token;
            db.query("SELECT * FROM accounts where token=?;", token, (err, result) => {
                if (err) {
                    reject(err)
                } else if (result.length > 0) {
                    resolve(result)
                }
            });
        });
    },


    updatePassword(obj) {
        return new Promise(function (resolve, reject) {
            const gmail = obj.gmail;
            const password = obj.password;

            bcrypt.hash(password, saltRound, (err, hash) => {
                if (err) {
                    reject(err)
                } else {
                    db.query(
                        "UPDATE accounts set password=?where email=?", [hash, gmail],
                        (err, result) => {
                            if (err) {
                                reject(err)
                            } else {
                                resolve(result)
                            }
                        });
                }
            });
        });
    }
}

exports.account = account