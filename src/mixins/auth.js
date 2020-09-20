import { auth } from 'firebase'

export default {
    data () {
        return {
        }
    },
    methods: {
        registerUser (email, password) {
            auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;

                console.error(errorCode, errorMessage)
                // ...
            });
        },
        loginUser (email, password) {
            auth().signInWithEmailAndPassword(email, password).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.error(errorCode, errorMessage)

                // ...
            });
        },
        listenToAuthStateChange () {
            auth().onAuthStateChanged(function(user) {
                if (user) {
                    // User is signed in.
                    this.$store.commit('SET_USER', user)
                    // var displayName = user.displayName;
                    // var email = user.email;
                    // var emailVerified = user.emailVerified;
                    // var photoURL = user.photoURL;
                    // var isAnonymous = user.isAnonymous;
                    // var uid = user.uid;
                    // var providerData = user.providerData;
                    // ...
                } else {
                    this.$store.commit('SIGN_OUT_USER', user)

                    // User is signed out.
                    // ...
                }
            });
        }
    }
}
