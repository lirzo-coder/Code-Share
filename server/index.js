const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
    // allow client server connection on development environment
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});
const blocksController = require("./controllers/blocksController");
const connectionsManager = require("./managers/connectionsManager");
const blocksManager = require("./managers/blocksManager");

const PORT = process.env.PORT || 3001;

// on connection if no readonly id set - set the new socket.
// if already set - the new socket will have edit permission.
// on disconnect, if disconnect id hold the readonly id, release it.
io.on("connection", (socket) => {
    console.log("a user connected");
    connectionsManager.addConnection(socket.id);
    if (!connectionsManager.getReadOnly()) {
        connectionsManager.setReadOnly(socket.id);
        console.log("set readonlyID " + socket.id);
    }
    socket.on("disconnect", () => {
        console.log("a user disconnected");
        connectionsManager.removeConnection(socket.id);
        blocksManager.commitEditedData();

        if (connectionsManager.getReadOnly() === socket.id) {
            connectionsManager.setReadOnly(null);
            console.log("release readonlyID");
        }
    });

    //if content received broadcast this content, else - broadcast block original content.
    socket.on("code-change", (msg) => {
        console.log("message: " + msg);
        const json = JSON.parse(msg);
        if (json.content) {
            blocksManager.updateBlockById(json.id, json.content);
        } else {
            blocksManager.updateBlockById(json.id, null);
        }
        io.emit("code-change", msg);
    });
});

app.get("/blocks", blocksController.getBlocks);
app.get("/blocks/:id", blocksController.getBlockById);

// expose react production build files on prod environment.
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.get("*", (req, res) =>
    res.sendFile(path.resolve("client", "build", "index.html"))
);

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
