import { auth } from 'firebase'
import { mapState } from "vuex";

export default {
    data () {
        return {
        }
    },
    computed: {
        ...mapState({
            user: (state) => state.user.user,
        }),
    },
    methods: {
        registerUser (email, password) {
            auth().createUserWithEmailAndPassword(email, password).then((result) => {
                console.log(result)
            }).catch(function(error) {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;

                console.error(errorCode, errorMessage)
                // ...
            });
        },
        loginUser (email, password) {
            auth().signInWithEmailAndPassword(email, password).then((result) => {
                console.log(result)
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.error(errorCode, errorMessage)

                // ...
            });

        },
        listenToAuthStateChange () {
            auth().onAuthStateChanged((user) => {
                if (user) {
                    // User is signed in.
                    this.$store.commit('SET_USER', user)
                    this.$router.push({name: 'meals_list'})
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
        },
        logoutUser (e) {
            e.preventDefault()
            auth().signOut().catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.error(errorCode, errorMessage)

                // ...
            });
        }
    }
}
