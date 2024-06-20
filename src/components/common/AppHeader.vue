<template>
  <v-toolbar>
    <v-toolbar-title>Turing Test</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat v-for="item in listNav" :key="item.name" :to="item.to">{{
        item.name
      }}</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script setup lang="ts">
const listNav = [
  { name: "Panel de control", to: "/" },
  { name: "Gestion de bots", to: "/list" },
  { name: "Analisis", to: "/analice" },
  { name: "Gestion de usuarios", to: "/users" },
  { name: "Configuracion", to: "/config" },
];
</script>

<style scoped lang="sass">
.social-link :deep(.v-icon)
  color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
  text-decoration: none
  transition: .2s ease-in-out

  &:hover
    color: rgba(25, 118, 210, 1)
</style>
