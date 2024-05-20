const mongoose = require("mongoose");

const Chat = mongoose.model("Chat", new mongoose.Schema({
    chatname: String,
    participants: [String],
    owner: String,
    messages: [
        {
            author: String,
            text: String,
            date: String
        }
    ]
}))

module.exports = Chat;