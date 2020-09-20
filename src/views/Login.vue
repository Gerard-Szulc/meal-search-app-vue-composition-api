<template>
<SignIn :register="false" :login="true"></SignIn>
</template>

<script>
import SignIn from "@/components/SignIn.vue";
export default {
name: "Login",
  components: {SignIn}
}
</script>

<style scoped>

</style>
