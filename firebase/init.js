import firebase
    from "firebase/app";
import 'firebase/analytics'

const firebaseConfig = {
    apiKey: "AIzaSyArE_4sbLy6wMSuw57IjIrji789WskvZYw",
    authDomain: "meal-recipes-f9f92.firebaseapp.com",
    projectId: "meal-recipes-f9f92",
    appId: "1:422054800413:web:a7a9227c437e0f0459eaf4",
    measurementId: "G-W7K9DZT6D1"
};

const startFirebase = () => {
    firebase.initializeApp(firebaseConfig)
    return firebase.analytics();
}
export default startFirebase