import firebase from "firebase";

const config = {
    apiKey: "AIzaSyByuj_J9SPS8H0tg4Zjib3655i0ZUS8Hn8",
    authDomain: "smartseedtext.firebaseapp.com",
    projectId: "smartseedtext",
    storageBucket: "smartseedtext.appspot.com",
    messagingSenderId: "643456542646",
    appId: "1:643456542646:web:aea7430247f86c3ae9c317",
    measurementId: "G-CJF5VJTVVD",
};

const initFirebase = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
};

initFirebase();

// export default firebase;

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage, firebase };
