import {auth} from 'firebase'
import {mapActions, mapState} from "vuex";
import notifier from "@/mixins/notifier.js";

export default {
    mixins: [notifier],
    mounted() {
        this.listenToAuthStateChange()
    },
    computed: {
        ...mapState({
            user: (state) => state.user.user,
        }),
    },
    methods: {
        ...mapActions({
            getFavourites: "getFavourites"
        }),
        registerUser(email, password) {
            auth().createUserWithEmailAndPassword(email, password).then((result) => {
                console.log(result)
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                this.$errorNotify('error', errorCode, errorMessage)
                console.error(errorCode, errorMessage)
            });
        },
        loginUser(email, password) {
            auth().signInWithEmailAndPassword(email, password).then(({user}) => {
                this.$errorNotify('success', '', (user.displayName ? user.displayName : user.email)  + ' succesfully signed in.' )
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                this.$errorNotify('error', errorCode, errorMessage)
                console.error(errorCode, errorMessage)
            });

        },
        listenToAuthStateChange() {
            auth().onAuthStateChanged((user) => {
                if (user) {
                    this.$store.commit('SET_USER', user)
                    this.$router.push({name: 'meals_list'})
                    this.getFavourites()
                } else {
                    this.$store.commit('SIGN_OUT_USER', user)
                }
            });
        },
        logoutUser(e) {
            e.preventDefault()
            let user = {...this.user}
            auth().signOut().then(() => {
                this.$errorNotify('success', '', (user.displayName ? user.displayName : user.email)  + ' succesfully signed out.' )
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.error(errorCode, errorMessage)
                this.$errorNotify('error', errorCode, errorMessage)
            });
        },
        loginWithGoogle: function (event) {
            event.preventDefault();
            var provider = new auth.GoogleAuthProvider();

            provider.addScope("openid");

            auth().useDeviceLanguage();

            auth()
                .signInWithPopup(provider)
                .then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    //var token = result.credential.accessToken;
                    // The signed-in user info.
                    var user = result.user;
                    // ...
                    this.$errorNotify('success', '', user.displayName + ' succesfully signed in.' )

                })
                .catch((error) => {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...
                    this.$errorNotify('error', errorCode, errorMessage + email + credential)
                });
        }
    }
}
