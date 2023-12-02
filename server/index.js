const express = require("express");
const app = express();
const path = require('path');
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});
const blocksController = require("./controllers/blocksController");
const connectionsManager = require("./managers/connectionsManager");
const blocksManager = require("./managers/blocksManager");

const PORT = process.env.PORT || 3001;

io.on("connection", (socket) => {
    console.log("a user connected");
    connectionsManager.addConnection(socket.id);
    if (!connectionsManager.getReadOnly()) {
        connectionsManager.setReadOnly(socket.id);
        console.log("set readonlyID " + socket.id);
    }
    console.log(connectionsManager.connectionsCount());
    socket.on("disconnect", () => {
        console.log("a user disconnected");
        connectionsManager.removeConnection(socket.id);
        if (connectionsManager.getReadOnly() === socket.id) {
            connectionsManager.setReadOnly(null);
            console.log("release readonlyID");
        }
        console.log(connectionsManager.connectionsCount());
    });
    socket.on("code-change", (msg) => {
        console.log("message: " + msg);
        const json = JSON.parse(msg);
        if (json.content) {
            blocksManager.updateBlockById(json.id, json.content);
        } else {
            blocksManager.updateBlockById(
                json.id,
                blocksManager.getBlockById(json.id).content
            );
        }
        io.emit("code-change", msg);
    });
});

app.use(express.static(path.resolve(__dirname, '../client/build')));
app.get("/blocks", blocksController.getBlocks);
app.get("/blocks/:id", blocksController.getBlockById);

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
