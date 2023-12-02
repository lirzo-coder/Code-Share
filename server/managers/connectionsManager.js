let connections = [];
let readOnlyId;

exports.getReadOnly = () => {
    return readOnlyId;
};

exports.setReadOnly = (id) => {
    readOnlyId = id;
};

exports.addConnection = async (id) => {
    connections.push(id);
};

exports.removeConnection = async (id) => {
    connections = connections.filter((connId) => connId !== id);
};

exports.connectionsCount = () => {
    return connections.length;
};
