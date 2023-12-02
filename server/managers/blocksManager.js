const blocks = {
    1: {
        title: "Async Code",
        id: 1,
        desc: "We can't wait for it anymore!",
        content: `const awaitFetch = async () => {\n    const route = '/route';\n    //TODO\n}`,
        solution: `const awaitFetch = async () => {\n    const route = '/route';\n    await fetch(route);\n}`,
    },
    2: {
        title: "Loops",
        id: 2,
        desc: "Let's try to repeat code for a while!",
        content: `let counter = //TODO;\nfor (let i = 0; i < counter; i++) {\n    console.log(i + "out of " + 10)\n}`,
        solution: `let counter = 10;\nfor (let i = 0; i < counter; i++) {\n    console.log(i + "out of " + 10)\n}`,
    },
    3: {
        title: "Conditions",
        id: 3,
        desc: "What if you try this one?",
        content: `const a = 1;\nconst b = 2;\nconst condition = //TODO\nif (condition) {\n    console.log('a < b')\n}`,
        solution: `const a = 1;\nconst b = 2;\nconst condition = a < b;\nif (condition) {\n    console.log('a < b')\n}`,
    },
    4: {
        title: "Functions",
        id: 4,
        desc: "How should we call this one?",
        content: `const printSomething = (something) => {\n    //TODO\n}`,
        solution: `const printSomething = (something) => {\n    console.log(something);\n}`,
    },
};

exports.getBlocks = () => {
    return Object.values(blocks).map((block) => {
        return {
            title: block.title,
            desc: block.desc,
            id: block.id,
        };
    });
};

exports.getBlockById = (id) => {
    return blocks[id];
};

exports.updateBlockById = (id, content) => {
    if (blocks[id]) {
        blocks[id].editedContent = content;
    }
};
