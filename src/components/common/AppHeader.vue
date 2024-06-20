<template>
  <v-app-bar app>
    <v-app-bar-title>Turing Test</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn
      v-for="item in listNav"
      :key="item.name"
      :to="item.to"
      class="mx-2 hidden-sm-and-down"
    >
      {{ item.name }}
    </v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
interface RouterNavModel {
  name: string;
  to: string;
}

const listNav: Array<RouterNavModel> = [
  { name: "Control Panel", to: "/" },
  { name: "Bot Management", to: "/list" },
  { name: "Analysis", to: "/analyze" },
  { name: "User Management", to: "/users" },
  { name: "Configuration", to: "/config" },
];
</script>

<style scoped lang="scss">
.v-app-bar {
  background-color: #ffffff;
  color: #000000;

  .v-toolbar-title {
    font-size: 1.25rem;
    font-weight: 500;
  }

  .v-btn {
    font-weight: 500;

    &:hover {
      color: #1976d2;
    }
  }
}
</style>
