const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = db.user;

const signup = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
    user.save((err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        res.status(200).send({message: "User has been successfully added"});
        console.log(`User with name ${user.username} has been added`);
    })
}

const signin = (req, res) => {
    User.findOne({email: req.body.email}).exec((err, user)=>{
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        if (!user) {
            return res.status(404).send({message: `User with ${req.body.email} hasn't been found`});
        }
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (passwordIsValid) {
            const token = jwt.sign({id: user.id}, "secret", {expiresIn: 1000 * 60 * 60});
            res.status(200).send({message: "User has been authenticated", payload: {userId: user.id}, user: {
                    username: user.username,
                    token
                }});
        } else {
            res.status(404).send({message: "Wrong email or password"});
        }
    })
}

module.exports = {
    signup,
    signin
}