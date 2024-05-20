const controller = require("../controllers/auth.controller");
const middlewares = require("../middlewares/auth.middleware");

module.exports = function (app) {
    app.post("/auth/signup", [middlewares.existingUser], controller.signup);
    app.post("/auth/signin", controller.signin);
}