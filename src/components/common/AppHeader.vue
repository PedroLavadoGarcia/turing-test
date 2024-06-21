<!-- AppHeader.vue -->
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
import { defineProps } from "vue";

export interface RouterNavModel {
  name: string;
  to: string;
}

defineProps<{
  listNav: RouterNavModel[];
}>();
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
