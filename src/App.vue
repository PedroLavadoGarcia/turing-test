<template>
  <v-app>
    <AppHeader :listNav="listNav" />
    <v-main>
      <router-view />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script lang="ts" setup>
import { RouterNavModel } from "./components/common/AppHeader.vue";

const listNav: Array<RouterNavModel> = [
  { name: "Control Panel", to: "/" },
  { name: "Bot Management", to: "/list" },
  { name: "Analysis", to: "/analyze" },
  { name: "User Management", to: "/users" },
  { name: "Configuration", to: "/config" },
];
</script>

<style>
html {
  overflow: auto;
}
</style>
