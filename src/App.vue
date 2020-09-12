<template>
  <v-app id="my-app">
    <v-app-bar
        :clipped-left="true"
        app
        color="#fcb69f"
        dark
        src="https://picsum.photos/1920/1080?random"
    >
      <template v-slot:img="{ props }">
        <v-img
            v-bind="props"
            gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon @click="handleDrawerOpened">

      </v-app-bar-nav-icon>

      <v-toolbar-title>
        <Header :title="''"/>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-expand-transition>

        <div v-if="searchOpened" style="display: flex">
          <v-text-field
              @blur.capture="() => searchOpened = false"
              solo
              label="Search by ingredient"
              :value="$store.state.searchState.search"
              @input="searchHandler"
              @keypress.enter="handleSearchSubmit"
              v-debounce:300="handleSearchSubmit"
          >

          </v-text-field>
        </div>
      </v-expand-transition>
      <v-btn icon @click="handleSearchOpened">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-expand-x-transition>
        <v-btn icon v-if="$route.name === 'meal'">
          <v-icon>mdi-heart</v-icon>
        </v-btn>
      </v-expand-x-transition>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer clipped left temporary app v-model="drawerOpened"

    >
      <v-toolbar></v-toolbar>
      <v-toolbar flat>
        <v-list>
          <v-list-group>
            <v-list-item-title class="title">Filter</v-list-item-title>
          </v-list-group>
        </v-list>
      </v-toolbar>
    </v-navigation-drawer>

    <!-- Sizes your content based upon application components -->
    <v-main :tag="'main'" class="">


      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <v-parallax
            :src="paralax.src"
        >
          <v-row
              v-if="paralax.title"
              align="center"
              justify="center"
          >
            <v-col class="text-center" cols="12">
              <h1 class="display-1 font-weight-thin mb-4">{{paralax.title}}</h1>
            </v-col>
          </v-row>
        </v-parallax>

        <keep-alive :include="['Search']">
          <router-view></router-view>
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
import {mapState, mapActions} from 'vuex'
import Header from './components/Header.vue';

export default {
  name: 'app',
  components: {Header},

  data() {
    return {
      drawerOpened: false,
      searchOpened: false,
      debounceContext: null
    }
  },
  async mounted() {
    await this.getMeals()
    let chosenThumb = this.meals[this.getRandomIntInclusive(0, this.meals.length)].strMealThumb
    this.$store.commit('SET_PARALAX', {src: chosenThumb})
    this.startChangingParalax(this.$route)
  },
  watch: {
    $route: function (next, prev) {
      console.log('route', prev.name, next.name)
      if (next.name === 'home') {
        this.getRandomParalax()
      }
    }
  },
  computed: {
    ...mapState({
      meals: state => state.meals.meals,
      paralax: state => state.meals.paralax
    }),
  },
  methods: {
    ...mapActions({
      getMeals: 'getMeals',
      setSearchTerm: 'setSearchTerm'
    }),
    handleDrawerOpened() {
      this.drawerOpened = !this.drawerOpened
    },
    handleSearchOpened() {
      this.searchOpened = !this.searchOpened
    },
    getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    searchHandler(e) {

      console.log('searchChanged', e)

      this.setSearchTerm(e)
    },
    handleSearchSubmit() {
      console.log('submit')
      this.getMeals(this.$store.state.searchState.search)
    },
    startChangingParalax (route) {
      setInterval(() => {
        if (route.name === 'home') {
          this.getRandomParalax()
        }
      }, 60000)
    },
    getRandomParalax () {
      this.$store.commit('SET_PARALAX', {src: this.meals[this.getRandomIntInclusive(0, this.meals.length)].strMealThumb})
    }
  }
}
</script>
<style>
/*#my-app {*/
/*    width: 100%;*/
/*    position: absolute;*/
/*    overflow: hidden;*/
/*    height: 100%;*/
/*    max-height: 100vh;*/
/*}*/

/*.overflow-y-auto {*/
/*    overflow-y: auto;*/
/*    max-height: 95vh;*/
/*}*/
</style>
