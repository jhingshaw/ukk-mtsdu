// Config Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA1bUu35nogcAsaEdSEhbnHCzUyT9ujeyc",
    authDomain: "ukk-mtsdu.firebaseapp.com",
    projectId: "ukk-mtsdu",
    storageBucket: "ukk-mtsdu.firebasestorage.app",
    messagingSenderId: "63306551884",
    appId: "1:63306551884:web:19aeb220fc47199d7a9ae9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Simpan ke global
window.db = db;