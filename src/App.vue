<template>
    <v-app id="my-app">
        <v-app-bar
                clipped-left
                app
                color="#fcb69f"
                dark
                src="https://picsum.photos/1920/1080?random"
                scroll-target=".overflow-y-auto"

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

                <v-text-field
                        solo
                        v-if="searchOpened"
                        label="Search"
                        :value="$store.state.searchState.search"
                        @input="searchHandler"
                        @keypress.enter="handleSearchSubmit"
                ></v-text-field>
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
        <v-content :tag="'main'" class="overflow-y-auto">


            <!-- Provides the application the proper gutter -->
            <v-container fluid>

                <!-- If using vue-router -->
                <keep-alive :include="['Search']">
                    <router-view></router-view>
                </keep-alive>
            </v-container>
        </v-content>

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
                searchOpened: false
            }
        },
        mounted() {
            this.getMeals()
        },

        computed: {
            ...mapState({meals: state => state.meals.meals})
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
            searchHandler(e) {
                console.log('searchChanged', e)
                this.setSearchTerm(e)
            },
            handleSearchSubmit() {
                this.getMeals(this.$store.state.searchState.search)
            }
        }
    }
</script>
<style>
    #my-app {
        width: 100%;
        position: absolute;
        overflow: hidden;
        height: 100%;
        max-height: 100vh;
    }

    .overflow-y-auto {
        overflow-y: auto;
        max-height: 95vh;
    }
</style>
