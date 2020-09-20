<template>
  <v-col cols="12">
    <v-row
        align="center"
        justify="center"
    >
      <v-card
          class="ma-3 pa-6"
          outlined
          tile
      >
        <transition-group name="fade" mode="out-in">
          <div key="signInForm" v-if="login === true" class="md-layout-item">
            <form class="md-layout" v-if="signedUserId === null">
              <div>
                <v-text-field label="Email" name='email' type='email' v-model="email"/>
              </div>
              <div>
                <v-text-field label="Password" name="password" type='password' v-model="password"/>
              </div>
              <div>
                <v-btn type="submit" v-on:click='signIn'>Sign In</v-btn>
              </div>
            </form>
          </div>

          <div key="signUpForm" v-if="register === true" class="md-layout-item">

            <form class="md-layout" v-if="signedUserId === null">
              <div>
                <v-text-field label="Email" name='email' type='email' v-model="newEmail"/>
              </div>
              <div>
                <v-text-field label="Password" name='password' type='password' v-model="newPassword"/>
              </div>
              <v-btn type="submit" v-on:click='signUp'>Sign Up</v-btn>

            </form>

          </div>
        </transition-group>
        <v-btn v-if="signedUserId === null" type="submit" v-on:click='loginWithGoogle'>
          Login with Google
        </v-btn>
      </v-card>
    </v-row>
  </v-col>
<!--    <button v-if="login === false && signedUserId === null" @click="login = true; register = false'-->
<!--            class="md-raised md-primary">Sign In-->
<!--    </button>-->
<!--    <button v-if="register === false && signedUserId === null" @click='login = false; register = true'-->
<!--            class="md-raised md-primary">Register-->
<!--    </button>-->



</template>
<script>
import firebase from "firebase";
import auth from "@/mixins/auth.js";

export default {
  name: "SignIn",
  mixins: [auth],
  props: {
    login: {type: Boolean, default: () => false},
    register: {type: Boolean, default: () => false},
  },
  data() {
    return {
      email: "",
      password: "",
      newEmail: "",
      newPassword: "",
    };
  },
  mounted() {
    this.listenToAuthStateChange()
  },
  computed: {
    signedUserId () {
      return this.user.hasOwnProperty('uid')
          ? this.user
          : null
    }
  },
  methods: {
    signIn: function (event) {
      event.preventDefault(),
          this.loginUser(this.email, this.password)

      this.email = ""
      this.password = ""
    },
    signUp: function (event) {
      event.preventDefault(),
          this.registerUser(this.newEmail, this.newPassword)

      this.email = ""
      this.password = ""
    },
    loginWithGoogle: function (event) {
      event.preventDefault();
      var provider = new firebase.auth.GoogleAuthProvider();

      provider.addScope("openid");

      firebase.auth().useDeviceLanguage();

      firebase
          .auth()
          .signInWithPopup(provider)
          .then(function (/*result*/) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            //var token = result.credential.accessToken;
            // The signed-in user info.
            //var user = result.user;
            // ...
          })
          .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            alert(errorCode, errorMessage, email, credential);
          });
    }
  }
};
</script>
<style scoped>
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active, .fade-leave-active /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0;
  transition: opacity 0.5s ease;
}
</style>


