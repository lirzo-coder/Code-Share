const { firebase } = require("./firebase.js");
const {
    collection,
    doc,
    query,
    getDoc,
    getDocs,
    updateDoc,
    getFirestore,
} = require("firebase/firestore");

const db = getFirestore(firebase);

exports.getBlocks = async () => {
    const blocks = await getDocs(query(collection(db, "blocks")));
    const blocksData = [];
    blocks.forEach((block) => blocksData.push(block.data()));
    return blocksData;
};
exports.getBlockById = async (id) => {
    const block = doc(db, "blocks", id);
    const res = await getDoc(block);
    const data = res.data();
    return data;
};
exports.updateBlockData = async (id, editedContent) => {
    const block = doc(db, "blocks", id);
    await updateDoc(block, { editedContent });
};
