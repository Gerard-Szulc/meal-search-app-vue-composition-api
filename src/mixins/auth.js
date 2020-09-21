import {auth} from 'firebase'
import {mapActions, mapState} from "vuex";

export default {
    data() {
        return {}
    },
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
            }).catch(function (error) {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;

                console.error(errorCode, errorMessage)
                // ...
            });
        },
        loginUser(email, password) {
            auth().signInWithEmailAndPassword(email, password).then((result) => {
                console.log(result)
            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.error(errorCode, errorMessage)

                // ...
            });

        },
        listenToAuthStateChange() {
            auth().onAuthStateChanged((user) => {
                if (user) {
                    // User is signed in.
                    this.$store.commit('SET_USER', user)
                    this.$router.push({name: 'meals_list'})
                    this.getFavourites()
                    // const db = initializeFirestore()
                    //
                    // db.collection(`users/${this.user.uid}/favourites`).get().then((querySnapshot) => {
                    //     let data = {}
                    //     querySnapshot.forEach(function(doc) {
                    //         // doc.data() is never undefined for query doc snapshots
                    //         console.log(doc.id, " => ", doc.data());
                    //         data[doc.id] = doc.data()
                    //     });
                    //     this.$store.commit('SET_FAVOURITES', data)
                    //
                    // });
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
        logoutUser(e) {
            e.preventDefault()
            auth().signOut().catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.error(errorCode, errorMessage)

                // ...
            });
        }
    }
}
