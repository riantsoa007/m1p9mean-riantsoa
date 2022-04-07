const Restaurant = require("../models/Restaurant");

const mongoose = require("mongoose");
// exports.findRestaurant = (req, res) => {
//   return "dsd";
// };
exports.create = (req, res, next) => {
    const restaurant = new Restaurant({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        nom: req.body.nom,
        numero : req.body.numero,
    });
    restaurant.save().then(
            result => {
                res.status(201).json({
                    message: "Restaurant created"
                });
                })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
};
exports.findRestaurant = (req, res) => {
    Restaurant.findById(req.params.userId)
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
exports.findAllRestaurant = (req, res, next) => {
    Restaurant.find({})
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