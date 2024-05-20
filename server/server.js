const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(cors());

app.use(express.json());

const dbConfig = require("./config/db.config");

const db = require("./models");
const {startWebsocketServer} = require("./ws-server");
const User = db.user;

db.mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("DB is connected");
    initial();
}).catch((err)=>{
    console.log("Error. DB is not connected ", err);
    process.exit();
});

function initial() {
    User.estimatedDocumentCount((err, usersCount)=>{
        console.log("User's count is ", usersCount);
        if (!err && usersCount === 0) {
            new User({username: "Admin",
                email: "Admin",
                password: "root"}).save(err => {
                if (err) {
                    console.log("Admin is not created ", err);
                }
                else {
                    console.log("Admin is created");
                }
            })
        }
    })
}

require("./routes/auth.routes")(app);
require("./routes/chats.routes")(app);
require("./routes/authCheck.routes")(app);

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

startWebsocketServer(server)