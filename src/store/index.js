import Vuex from 'vuex'
import Vue from "vue";
import {meals} from "@/store/modules/meals/meals.js";
import {searchState} from "@/store/modules/search/index.js";
import {user} from "@/store/modules/user/user.js";

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        meals: meals,
        searchState: searchState,
        user: user
    },
})
