import * as firebase from "firebase/app"
import "firebase/auth"


const app = firebase.initializeApp({
    apiKey: "AIzaSyB-wdDhFB9po8vx_talwR1MaIM7wD8KzQs",
    authDomain: "acnh-share.firebaseapp.com",
    databaseURL: "https://acnh-share.firebaseio.com",
    projectId: "acnh-share",
    storageBucket: "acnh-share.appspot.com",
    messagingSenderId: "42593365910",
    appId: "1:42593365910:web:aaf1ed429ceef53aac37b7",
    measurementId: "G-F1GV50HXRM"
})

export default app