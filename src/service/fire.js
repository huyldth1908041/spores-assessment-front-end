import firebase from "firebase";
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBcKBLIaU5hd5udUtFrAckm4eerD9GGjgM",
    authDomain: "spores-internship.firebaseapp.com",
    projectId: "spores-internship",
    storageBucket: "spores-internship.appspot.com",
    messagingSenderId: "680777121188",
    appId: "1:680777121188:web:1fd0afbe2f383d2c749531",
    measurementId: "G-G05GX9BNN8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const storage = firebase.storage()
export  {
    storage, firebase as default
}