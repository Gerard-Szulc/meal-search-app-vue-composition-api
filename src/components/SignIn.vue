<template>
  <v-col cols="12">
    <v-row
        align="center"
        justify="center"
    >
        <transition-group name="fade" mode="out-in">
          <div key="signInForm" class="md-layout-item pa-5">
            <form class="md-layout" v-if="signedUserId === null">
              <div>
                <v-text-field label="Email" name='email' type='email' v-model="email"/>
              </div>
              <div>
                <v-text-field label="Password" name="password" type='password' v-model="password"/>
              </div>
              <v-row
                  justify="center"
              >
                <v-btn type="submit" v-on:click='signIn'>Sign In</v-btn>
                <v-btn type="submit" v-on:click='signUp'>Sign Up</v-btn>
                <v-btn key="signWithGoogleForm" class="" v-if="signedUserId === null" type="submit" v-on:click='loginWithGoogle'>
                  Login with Google
                </v-btn>
              </v-row>

            </form>
            <div v-else>Already signed in</div>

          </div>

        </transition-group>

    </v-row>
  </v-col>

</template>
<script>
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
    };
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
          this.registerUser(this.email, this.email)

      this.email = ""
      this.password = ""
    },
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


