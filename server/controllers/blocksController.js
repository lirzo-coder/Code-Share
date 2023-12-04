const blocksManager = require("../managers/blocksManager");
const connectionsManager = require("../managers/connectionsManager");
exports.getBlockById = async (req, res) => {
    const block = await blocksManager.getBlockById(req.params.id);
    const readOnlyId = connectionsManager.getReadOnly();
    return res.json({ ...block, readOnlyId });
};

exports.getBlocks = async (req, res) => {
    const blocks = await blocksManager.getBlocks();
    return res.json(blocks);
};
