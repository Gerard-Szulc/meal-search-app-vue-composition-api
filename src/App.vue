<template>
  <v-app id="my-app">
    <v-app-bar
        app
    >
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
      <v-expand-x-transition>
        <v-btn icon @click="handleSearchOpened" v-if="$route.name === 'meals_list'">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-expand-x-transition>
      <v-expand-x-transition>
        <v-btn icon v-if="$route.name === 'meal' || $route.name === 'favouriteMeal'" @click="handleFavourite">
          <v-icon>{{ favourites.hasOwnProperty($route.params.id) ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
        </v-btn>
      </v-expand-x-transition>
      <!--      <v-btn icon>-->
      <!--        <v-icon>mdi-dots-vertical</v-icon>-->
      <!--      </v-btn>-->
    </v-app-bar>

    <NavigationDrawer :drawer="drawerOpened" v-on:closeDrawer="(value) => drawerOpened = !!value"></NavigationDrawer>
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
        <v-snackbar
            v-model="updateExists"
            :multi-line="true"
            top
            rounded
            color="success"
        >
          New content is available!

          <template v-slot:action="{ attrs }">
            <v-btn
                text
                v-bind="attrs"
                @click="handleUpdateSW"
            >
              Refresh
            </v-btn>
          </template>
        </v-snackbar>
        <v-parallax v-if="$route.name === 'meal' || $route.name === 'favouriteMeal'" :src="paralax.src">
          <v-row v-if="paralax.title" align="center" justify="center">
            <v-col class="text-center" cols="12">
              <h1 class="display-1 font-weight-thin mb-4">{{ paralax.title }}</h1>
            </v-col>
          </v-row>
        </v-parallax>

        <router-view @meal-loaded="handleMealLoaded"></router-view>
      </v-container>
    </v-main>

    <v-footer app>
    </v-footer>
    <notifications/>
  </v-app>
</template>

<script>
import {mapState, mapActions} from "vuex";
import NavigationDrawer from "@/components/NavigationDrawer.vue";
import {initializeFirestore} from "./firebase/init";


export default {
  name: "app",
  components: {NavigationDrawer},

  data() {
    return {
      drawerOpened: false,
      searchOpened: false,
      debounceContext: null,
      routerItemsCrumbs: [],
      refreshing: false,
      registration: null,
      updateExists: false,
    };
  },
  created() {
    document.addEventListener(
        'swUpdated', (e) => {
          console.log(e)
          this.registration = e.detail
          this.updateExists = true
        }, {once: true}
    );
    navigator.serviceWorker.addEventListener(
        'controllerchange', () => {
          if (this.refreshing) return;
          this.refreshing = true;
          window.location.reload();
        }
    );
  },
  async mounted() {
    let matched = window.matchMedia('prefers-color-scheme: dark').matches;

    if (matched) {
      this.$vuetify.theme.dark = true
    } else {
      this.$vuetify.theme.dark = false
    }

    await this.getMeals();
    this.getBReadCrumbs();
    let chosenThumb = this.meals[
        this.getRandomIntInclusive(0, this.meals.length)
        ].strMealThumb;

    this.$store.commit("SET_PARALAX", {src: chosenThumb});
    this.startChangingParalax(this.$route);
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
      favourites: (state) => state.user.favourites,
      meals: (state) => state.meals.meals,
      paralax: (state) => state.meals.paralax,
      savedDynamicBreadcrumbs: (state) => state.meals.savedDynamicBreadcrumbs,
    }),
  },
  methods: {
    ...mapActions({
      getMeals: "getMeals",
      setSearchTerm: "setSearchTerm",
      getFavourites: "getFavourites"
    }),
    handleUpdateSW() {
      this.updateExists = false;

      if (!this.registration || !this.registration.waiting) {
        return;
      }
      this.registration.waiting.postMessage('skipWaiting');
    },
    handleFavourite() {
      const db = initializeFirestore()
      if (this.favourites.hasOwnProperty(this.$route.params.id)) {
        db.collection(`users/${this.$store.state.user.user.uid}/favourites`).doc(this.$route.params.id).delete().then(() => {
          this.getFavourites()
        }).catch(function (error) {
          console.error("Error removing document: ", error);
        });
        return
      }
      db.collection(`users/${this.$store.state.user.user.uid}/favourites`).doc(this.$route.params.id).set(
          this.meals.find((meal) => meal.idMeal === this.$route.params.id)
      ).then(() => {
        this.getFavourites()
        console.log("Document successfully written!");
      }).catch((error) => {
        console.error("Error writing document: ", error);
      });
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
