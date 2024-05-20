const db = require("../models");

const Chat = db.chat;

const getChats = (req, res) => {
    Chat.find({participants: req.params.user}).exec((err, chats)=>{
        if (err) {
            return res.status(500).send({message: err});
        }
        if (!chats.length) {
            return res.status(404).send({message: `Chats for ${req.params.user} haven't been found`});
        }
        res.status(200).send({message: "Chats have been found", payload: chats});
    })
}

const createChat = (req, res) => {
    const chat = new Chat({
        chatname: req.body.chatname,
        participants: req.body.participants,
        owner: req.body.owner,
        messages: []
    })
    chat.save((err, chat) => {
        if (err) {
            return res.status(500).send({message: err});
        }
        res.status(200).send({message: "Chat has been successfully added"});
        console.log(`Chat named ${chat.chatname} has been added`);
    })
}

const deleteChat = (req, res) => {
    const id = req.params.id;
    Chat.findById(id, (err, chat) => {
        if (err) {
            return res.status(500).send({message: err});
        }
        if (!chat) {
            return res.status(404).send({message: `Chat for ${req.body.owner} hasn't been found`});
        }
        if (chat.owner !== req.body.owner) {
            return res.status(401).send({message: `This user can't delete this chat`});
        }
        Chat.deleteOne({_id: id}, (err, chat) => {
            if (err) {
                return res.status(500).send({message: err});
            }
            res.status(200).send({message: `Chat named ${req.body.chatname} has been deleted`});
        })
    })
}

const updateChat = (req, res) => {
    const id = req.params.id;
    Chat.findById(id, (err, chat) => {
        if (err) {
            return res.status(500).send({message: err});
        }
        if (!chat) {
            return res.status(404).send({message: `Chat for ${req.body.id} hasn't been found`});
        }

        if (req.body.chatname) {
            Chat.updateOne({_id: id}, {
                chatname: req.body.chatname
            }).exec((err, chat) => {
                if (err) {
                    return res.status(500).send({message: err});
                }
                if (!chat) {
                    return res.status(404).send({message: `Chat for ${req.body.id} hasn't been found`});
                }
                res.status(200).send({message: "Chat name has been updated"});
            })
        }
        const previousOwner = chat.owner;
        if (req.body.participants[1]) {
            if (previousOwner === req.body.user) {
                Chat.updateOne({_id: id}, {
                    participants: req.body.participants
                }).exec((err, chat) => {
                    if (err) {
                        return res.status(500).send({message: err});
                    }
                    if (!chat) {
                        return res.status(404).send({message: `Chat for ${req.body.id} hasn't been found`});
                    }
                    res.status(200).send({message: "Chat participants have been updated"});
                })
            }
            else {
                return res.status(401).send({message: `This user can't add participants to this chat`});
            }
        }
        if (req.body.owner) {
            if (previousOwner === req.body.user) {
                Chat.updateOne({_id: id}, {
                    owner: req.body.owner
                }).exec((err, chat)=>{
                    if (err) {
                        return res.status(500).send({message: err});
                    }
                    if (!chat) {
                        return res.status(404).send({message: `Chat for ${req.body.id} hasn't been found`});
                    }
                    res.status(200).send({message: "Chat owner has been updated"});
                })
            }
            else {
                return res.status(401).send({message: `This user can't change the owner of this chat`});
            }
        }
    })
}

module.exports = {
    getChats,
    createChat,
    deleteChat,
    updateChat
}