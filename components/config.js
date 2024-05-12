import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAsGayhEtgleRGsDCme40wu8Z0d-F3yApI",
    authDomain: "videoai-a83c6.firebaseapp.com",
    projectId: "videoai-a83c6",
    storageBucket: "videoai-a83c6.appspot.com",
    messagingSenderId: "1074917851230",
    appId: "1:1074917851230:web:f2f54dc1e509e71a84f4cf",
    measurementId: "G-4QPLKQX4YQ"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };