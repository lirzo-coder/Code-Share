const { initializeApp } = require("firebase/app");

const firebaseConfig = {
    apiKey: "AIzaSyDZnci8rnBnzFcuiVMncOnjxhwK8EDtttI",
    authDomain: "task-61d5b.firebaseapp.com",
    projectId: "task-61d5b",
    storageBucket: "task-61d5b.appspot.com",
    messagingSenderId: "139804310268",
    appId: "1:139804310268:web:4ae5ed26d49abc318eb579",
};

// Initialize Firebase
exports.firebase = initializeApp(firebaseConfig);
