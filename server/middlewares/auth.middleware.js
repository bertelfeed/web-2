const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({message: "No token provided"});
    }

    jwt.verify(token, "secret", (err, decoded) => {
        if (err) {
            return res.status(401).send({message: "Unauthorized"});
        }
        req.userId = decoded.id;
        next();
    })
}

const db = require("../models");

const existingUser = (req, res, next) => {
    db.user.findOne({email: req.body.email}).exec((err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        if (!user) {
            next();
        } else {
            return res.status(403).send({message: `User with ${req.body.email} is already exists`});
        }
    })
}

module.exports = {
    verifyToken,
    existingUser
};