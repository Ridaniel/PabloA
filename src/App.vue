<template>
  <v-app>
    <v-navigation-drawer app>
      <v-list>
        <v-list-item-group>
          <v-list-item @click="navigate('/')">
            <v-list-item-content>Main</v-list-item-content>
          </v-list-item>
          <v-list-item @click="navigate('/resume')">
            <v-list-item-content>Resume</v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-toolbar-title>Inventory Management App</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  methods: {
    navigate(path) {
      this.$router.push(path);
    }
  }
}
</script>
