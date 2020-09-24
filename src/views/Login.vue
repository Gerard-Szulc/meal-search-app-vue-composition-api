<template>
  <v-row
      align="center"
      justify="center"
  >
  <v-card
      class="ma-3 pa-6"
  >
    <SignIn :register="register" :login="login"></SignIn>
  </v-card>
  </v-row>
</template>

<script>
import SignIn from "@/components/SignIn.vue";

export default {
  name: "Login",
  components: {SignIn},
  data() {
    return {
      register: false,
      login: true,
    }
  }
}
</script>

<style scoped>

</style>
