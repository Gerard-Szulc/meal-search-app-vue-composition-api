<template>
  <div class="App">
    <Header :title="'Composition API'" />
    <router-view />
  </div>
</template>

<script>
  import Header from './components/Header.vue';

  export default {
    name: 'app',
    components: { Header },
  }
</script>
