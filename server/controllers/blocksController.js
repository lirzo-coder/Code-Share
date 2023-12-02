const blocksManager = require("../managers/blocksManager");
const connectionsManager = require("../managers/connectionsManager");
exports.getBlockById = async (req, res) => {
    const block = blocksManager.getBlockById(req.params.id);
    const readOnlyId = connectionsManager.getReadOnly();
    return res.json({ ...block, readOnlyId });
};

exports.getBlocks = async (req, res) => {
    return res.json(blocksManager.getBlocks());
};
