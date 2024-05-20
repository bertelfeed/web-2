const mongoose = require("mongoose");
const Message = mongoose.model("Message", new mongoose.Schema({
    author: String,
    text: String,
    date: String,
    readBy: [String]
}))

module.exports = Message;ge;