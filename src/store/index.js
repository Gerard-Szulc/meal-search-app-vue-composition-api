import Vuex from 'vuex'
import Vue from "vue";
import {meals} from "./modules/meals/meals";
import {searchState} from "./modules/search";

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        meals: meals,
        searchState: searchState
    },
    state: {
        count: 0
    },
    mutations: {
        increment(state) {
            state.count++
        }
    }
})
