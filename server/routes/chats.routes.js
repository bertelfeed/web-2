const controller = require("../controllers/chats.controller");

module.exports = function (app) {
    app.get("/chats/:user", controller.getChats);
    app.post("/chats", controller.createChat);
    app.delete("/chats/:id", controller.deleteChat);
    app.put("/chats/:id", controller.updateChat);
}