import Firebase from 'firebase';
let config = {
    apiKey: "AIzaSyBKiPUdwRj8cVoKevjUgt_B6D6-9Opgars",
    authDomain: "cpd15624188.firebaseapp.com",
    databaseURL: "https://cpd15624188.firebaseio.com",
    projectId: "cpd15624188",
    storageBucket: "cpd15624188.appspot.com",
    messagingSenderId: "752588529526",
    appId: "1:752588529526:web:575456a064ed89d5692457",
    measurementId: "G-5J542YR0N6"
};
let app = Firebase.initializeApp(config);
export const db = app.database();