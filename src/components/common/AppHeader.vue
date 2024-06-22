<template>
  <v-app-bar app>
    <template v-slot:prepend>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-app-bar-nav-icon
            v-bind="props"
            class="hidden-md-and-up"
          ></v-app-bar-nav-icon>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in listNav"
            :key="index"
            :value="index"
            :to="item.to"
          >
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
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
  background-color: var(--color-background-light) !important;
  color: var(--color-text-primary) !important;

  .v-toolbar-title {
    font-size: 1.25rem;
    font-weight: 500;
  }

  .v-btn {
    font-weight: 500;

    &:hover {
      color: var(--color-action-button-hover);
    }
  }
}
</style>
