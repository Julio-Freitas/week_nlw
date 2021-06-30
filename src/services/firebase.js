import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/analytics";

const {
    REACT_APP_API_KEY,
    REACT_APP_API_AUTHDOMIN,
    REACT_APP_API_BASE_URL,
    REACT_APP_API_PROJECT_ID,
    REACT_APP_API_STORAGE_BUCKET,
    REACT_APP_API_MENSSAGER_SENDER_ID,
    REACT_APP_ID,
    REACT_APP_API_MEASUREMENT_ID,
} = process.env;

const firebaseConfig = {
    apiKey: REACT_APP_API_KEY,
    authDomain: REACT_APP_API_AUTHDOMIN,
    databaseURL: REACT_APP_API_BASE_URL,
    projectId: REACT_APP_API_PROJECT_ID,
    storageBucket: REACT_APP_API_STORAGE_BUCKET,
    messagingSenderId: REACT_APP_API_MENSSAGER_SENDER_ID,
    appId: REACT_APP_ID,
    measurementId: REACT_APP_API_MEASUREMENT_ID,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const database = firebase.database();

export { auth, database, firebase };
