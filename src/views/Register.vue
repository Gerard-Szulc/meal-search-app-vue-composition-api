<template>
  <SignIn :register="true" :login="false"></SignIn>
</template>

<script>
import SignIn from "@/components/SignIn.vue";
export default {
name: "Register",
  components: {SignIn}
}
</script>

<style scoped>

</style>
