<template>
    <v-app id="my-app">
        <v-app-bar
                clipped-left
                color="#fcb69f"
                dark
                shrink-on-scroll
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
            <v-text-field
                    label="Search"
                    v-model="store.state.searchState.search"
                    @input="searchHandler"
                    @keypress.enter="handleSubmit"
            ></v-text-field>

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
        <v-navigation-drawer left absolute temporary app v-model="appState.drawerOpened">
            <!-- -->
        </v-navigation-drawer>


        <!-- Sizes your content based upon application components -->
        <v-content :tag="'main'" class="overflow-y-auto">


            <!-- Provides the application the proper gutter -->
            <v-container fluid>

                <!-- If using vue-router -->
                <router-view></router-view>
            </v-container>
        </v-content>

        <v-footer app>
            <!-- -->
        </v-footer>
    </v-app>
</template>

<script>
    import {store} from "./store";
    import Header from './components/Header.vue';
    import {onMounted, reactive} from '@vue/composition-api'
    import {useHandleMeals} from "./hooks/useHandleMeals";

    export default {
        name: 'app',
        components: {Header},

        setup() {
            const {state, getMeals, handleSearch, searchChangedHandler} = useHandleMeals()

            const appState = reactive({
                search: '',
                drawerOpened: false,
                searchOpened: false
            })
            onMounted(() => {
                getMeals()
            });
            const handleDrawerOpened = () => {
                appState.drawerOpened = !appState.drawerOpened
            }
            const handleSearchOpened = () => {
                appState.searchOpened = !appState.searchOpened
            }
            const searchHandler = (e) => {
              console.log('seachChanged', e)
                searchChangedHandler()
            }
            const handleSubmit = () => {
                handleSearch(store.state.searchState.search)
            }

            return {
                state,
                store,
                handleSearch,
                handleSubmit,
                searchHandler,
                appState,
                handleDrawerOpened,
                handleSearchOpened
            }
        }
    }
</script>
<style>
    #my-app {
        overflow: hidden;
        height: 100%;
        max-height: 100vh;
    }

    .overflow-y-auto {
        overflow-y: auto;
        max-height: 100vh;
    }
</style>
