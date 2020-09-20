<template>
  <v-navigation-drawer
      left
      app
      permanent
      :value="active"
      :mini-variant.sync="mini"
  >
    <v-list-item class="px-2" nav>
      <template v-if="user.hasOwnProperty('uid')">
        <v-list-item-avatar>
          <v-img v-if="user.photoURL" :src="user.photoURL"/>
          <v-icon v-else>mdi-account-circle</v-icon>

          <!--        <v-img src="https://randomuser.me/api/portraits/men/1.jpg"></v-img>-->
        </v-list-item-avatar>

        <v-list-item-title>{{user.displayName || user.email}}</v-list-item-title>
      </template>
      <template v-else>
        <v-list-item-avatar>
          <v-icon>mdi-account-circle</v-icon>
          <!--        <v-img src="https://randomuser.me/api/portraits/men/1.jpg"></v-img>-->
        </v-list-item-avatar>

        <v-list-item-title @click="$router.push('login')"> My account </v-list-item-title>
      </template>

      <v-btn
          icon
          @click.stop="mini = !mini"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          @click="() => $router.push({name: item.name})"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <v-divider></v-divider>
      <div class="pa-2">
        <v-btn block @click="logoutUser">Logout</v-btn>
      </div>
        <v-btn
           @click="() => $vuetify.theme.dark = !$vuetify.theme.dark"
        >
          <v-icon>{{ $vuetify.theme.dark ? 'mdi-brightness-4' : 'mdi-brightness-5' }}</v-icon>
        </v-btn>
<!--        <v-switch-->
<!--            v-model="$vuetify.theme.dark"-->
<!--            hide-details-->
<!--            inset-->
<!--            label="Theme Dark"-->
<!--        ></v-switch>-->
    </template>
  </v-navigation-drawer>
</template>

<script>
import auth from "@/mixins/auth.js";

export default {
  mixins: [auth],
  props: {
    drawer: {type: Boolean}
  },
  name: "NavigationDrawer",
  watch: {
    drawer: function () {
      this.mini = !this.mini
    }
  },
  data() {
    return {
      mini: true,
      active: false,
      items: [
        {title: 'Meals list', icon: 'mdi-view-dashboard', name: 'meals_list'},
        {title: 'Favourite meals', icon: 'mdi-heart', name: 'favourites'},
        {title: 'Account', icon: 'mdi-account-box'},
      ],
    }
  },
}
</script>

<style scoped>

</style>
