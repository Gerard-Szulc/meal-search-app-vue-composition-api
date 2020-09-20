<template>
  <v-app id="my-app">
    <v-app-bar
      app
    >
<!--      <template v-slot:img="{ props }">-->
<!--        <v-img v-bind="props" gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"></v-img>-->
<!--      </template>-->

      <v-app-bar-nav-icon @click="handleDrawerOpened"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <v-breadcrumbs :items="routerItemsCrumbs" large></v-breadcrumbs>
        <!--        <Header :title="''"/>-->
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-expand-transition>
        <div v-if="searchOpened" style>
          <v-text-field
            @blur.capture="() => searchOpened = false"
            solo
            hide-details
            label="Search by ingredient"
            :value="$store.state.searchState.search"
            @input="searchHandler"
            @keypress.enter="handleSearchSubmit"
            v-debounce:300="handleSearchSubmit"
          ></v-text-field>
        </div>
      </v-expand-transition>
      <v-btn icon @click="handleSearchOpened">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-expand-x-transition>
        <v-btn icon v-if="$route.name === 'meal'" @click="handleFavourite">
          <v-icon>{{favourites.hasOwnProperty($route.params.id) ? 'mdi-heart' : 'mdi-heart-outline'}}</v-icon>
        </v-btn>
      </v-expand-x-transition>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <NavigationDrawer :drawer="drawerOpened" v-on:closeDrawer="() => !drawerOpened"></NavigationDrawer>
<!--    <v-navigation-drawer>-->
<!--      <v-toolbar></v-toolbar>-->
<!--      <v-toolbar flat>-->
<!--        <v-list>-->
<!--          <v-list-group>-->
<!--            <v-list-item-title class="title">Filter</v-list-item-title>-->
<!--          </v-list-group>-->
<!--        </v-list>-->
<!--      </v-toolbar>-->
<!--    </v-navigation-drawer>-->

    <!-- Sizes your content based upon application components -->
    <v-main :tag="'main'" class>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <v-parallax :src="paralax.src">
          <v-row v-if="paralax.title" align="center" justify="center">
            <v-col class="text-center" cols="12">
              <h1 class="display-1 font-weight-thin mb-4">{{paralax.title}}</h1>
            </v-col>
          </v-row>
        </v-parallax>

        <keep-alive :include="['Search']">
          <router-view @meal-loaded="handleMealLoaded"></router-view>
        </keep-alive>
        <!-- If using vue-router -->
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
import webStorage from "./webstorage/webstorage.js";
import NavigationDrawer from "@/components/NavigationDrawer.vue";
export default {
  name: "app",
  components: {NavigationDrawer},

  data() {
    return {
      favourites: {},
      drawerOpened: false,
      searchOpened: false,
      debounceContext: null,
      routerItemsCrumbs: [],
    };
  },
  async mounted() {
    let matched = window.matchMedia('prefers-color-scheme: dark').matches;

    if(matched) {
      console.log('Currently in dark mode');
      this.$vuetify.theme.dark = true
    }
    else {
      console.log('Currently not in dark mode');
      this.$vuetify.theme.dark = false
    }



    await this.getMeals();
    this.getBReadCrumbs();
    let chosenThumb = this.meals[
      this.getRandomIntInclusive(0, this.meals.length)
    ].strMealThumb;
    this.$store.commit("SET_PARALAX", { src: chosenThumb });
    this.startChangingParalax(this.$route);
  },
  beforeMount() {
    this.favourites = webStorage.getFavourites();
  },
  watch: {
    $route: function (next) {
      this.getBReadCrumbs();
      if (next.name === "meals_list") {
        this.getRandomParalax();
      }
    },
    savedDynamicBreadcrumbs: function () {
      this.getBReadCrumbs();
    },
  },
  computed: {
    ...mapState({
      meals: (state) => state.meals.meals,
      paralax: (state) => state.meals.paralax,
      savedDynamicBreadcrumbs: (state) => state.meals.savedDynamicBreadcrumbs,
    }),
  },
  methods: {
    ...mapActions({
      getMeals: "getMeals",
      setSearchTerm: "setSearchTerm",
    }),
    handleFavourite() {
      if (webStorage.getFavourite(this.$route.params.id)) {
        webStorage.remove(this.$route.params.id);
        this.favourites = webStorage.getFavourites();
        return;
      }
      webStorage.setFavourite({
        key: this.$route.params.id,
        value: JSON.stringify(
          this.meals.find((meal) => meal.idMeal === this.$route.params.id)
        ),
      });
      this.favourites = webStorage.getFavourites();
    },
    handleMealLoaded() {
      this.getBReadCrumbs();
    },
    getBReadCrumbs() {
      this.routerItemsCrumbs = this.$router.currentRoute.matched.map((el) => {
        return {
          disabled: false,
          exact: true,
          text: el.meta.dynamicTitle
            ? this.savedDynamicBreadcrumbs[this.$route.name]
            : el.meta.title,
          to: el,
        };
      });
    },
    handleDrawerOpened() {
      this.drawerOpened = !this.drawerOpened;
    },
    handleSearchOpened() {
      this.searchOpened = !this.searchOpened;
    },
    getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    searchHandler(e) {
      this.setSearchTerm(e);
    },
    handleSearchSubmit() {
      this.getMeals(this.$store.state.searchState.search);
    },
    startChangingParalax(route) {
      setInterval(() => {
        if (route.name === "meals_list") {
          this.getRandomParalax();
        }
      }, 60000);
    },
    getRandomParalax() {
      this.$store.commit("SET_PARALAX", {
        src: this.meals[this.getRandomIntInclusive(0, this.meals.length)]
          .strMealThumb,
      });
    },
  },
};
</script>
<style>
</style>
