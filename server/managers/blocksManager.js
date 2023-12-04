const blocksDb = require("../DB/blocksDb");
const blocks = {};
let blocksToCommit = new Set();

exports.getBlocks = async () => {
    const blocks = await blocksDb.getBlocks();
    return blocks.map((block) => {
        return {
            title: block.title,
            desc: block.desc,
            id: block.id,
        };
    });
};

exports.getBlockById = async (id) => {
    const block = await blocksDb.getBlockById(id);
    if (blocks[id]) {
        block.editedContent = blocks[id].editedContent;
    }
    return block;
};

exports.updateBlockById = (id, content) => {
    blocks[id] = { editedContent: content };
    blocksToCommit.add(id);
};

// on disconnect write all edited changes to db
exports.commitEditedData = async () => {
    for (const id of [...blocksToCommit]) {
        await blocksDb.updateBlockData(id, blocks[id].editedContent);
    }

    blocksToCommit = new Set();
};
