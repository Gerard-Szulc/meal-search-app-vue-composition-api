<template>
  <v-app>
    <v-navigation-drawer app>
      <!-- -->
    </v-navigation-drawer>

    <v-app-bar app>
      <!-- -->
      <Header :title="'Composition API'" />

    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-content>


      <!-- Provides the application the proper gutter -->
      <v-container fluid>

        <!-- If using vue-router -->
        <router-view />
     </v-container>
    </v-content>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
  import Header from './components/Header.vue';

  export default {
    name: 'app',
    components: { Header },
  }
</script>
