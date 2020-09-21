import firebase
    from "firebase/app";
import 'firebase/analytics'

const firebaseConfig = {
    apiKey: "AIzaSyArE_4sbLy6wMSuw57IjIrji789WskvZYw",
    authDomain: "meal-recipes-f9f92.firebaseapp.com",
    databaseURL: "https://meal-recipes-f9f92.firebaseio.com",
    projectId: "meal-recipes-f9f92",
    storageBucket: "meal-recipes-f9f92.appspot.com",
    messagingSenderId: "422054800413",
    appId: "1:422054800413:web:a7a9227c437e0f0459eaf4",
    measurementId: "G-W7K9DZT6D1"
};

const startFirebase = () => {
    firebase.initializeApp(firebaseConfig)
    let analytics
    if (process.env.NODE_ENV === 'production') {
        analytics = firebase.analytics();
    }

    return analytics
}
const initializeFirestore = () => {
    return firebase.firestore();
}

export { startFirebase, initializeFirestore }
