

const JWT_KEY = "nothingtosay"
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

exports.user_signup = (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Mail exists"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            nom: req.body.nom,
                            prenom: req.body.prenom,
                            role: req.body.role,
                            restaurant_id :req.body.restaurant_id
                        });
                        user
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: "User created"
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        });
};

exports.user_login = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Mot de passe ou Email invalide"
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message:  "Mot de passe  invalide"
                    });
                }
                if (result) {

                    const token = jwt.sign(
                        {
                            email: user[0].email,
                            userId: user[0]._id,
                            role: user[0].role,
                            restaurant :  user[0].restaurant_id
                        },
                        JWT_KEY,
                        {
                            expiresIn: "3h"
                        }
                    );
            
                    return res.status(200).json({
                        message: "Authentification success",
                        token: token,
                        expiresIn: "3h"
                    });
                }
                res.status(401).json({
                    message:  "Mot de passe ou email invalide"
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.user_delete = (req, res, next) => {
    User.remove({ _id: req.params.userId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "User deleted"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};
exports.user = function(req, res, next) {
  
    if (req.userData) {
      res.send(req.userData);
      next();
    } 
    else {
     return res.status(401).json({ message: 'Invalid token' });
    }
  };
  exports.findall =  (req, res, next) => {
    User.find({})
        .exec()
        .then(result => {
            res.status(200).json({
              data : result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    
};
