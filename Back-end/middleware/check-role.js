const JWT_KEY = "nothingtosay"

const jwt = require('jsonwebtoken');
const error = " user need for this api";

exports.isClient = (req, res, next) => {
    let role = req.userData.role;
  
        if(role == 'client'){
            next();
        }else{
            return res.status(401).json({
                message: "Client"+error
            });
        }
}
exports.isLivreur = (req, res, next) => {
    let role = req.userData.role;
    if(role == 'livreur'){
        next();
    }else{
        return res.status(401).json({
            message:  "Livreur"+error
        });
    }
}
exports.isRestaurant = (req, res, next) => {
    let role = req.userData.role;
    if(role == 'restaurant'){
        next();
    }else{
        return res.status(401).json({
            message:  "Restaurant "+error
        });
    }
}
exports.isResponsable = (req, res, next) => {
    let role = req.userData.role;
    if(role == 'responsable'){
        next();
    }else{
        return res.status(401).json({
            message:  "Responsable"+error
        });
    }
}
  