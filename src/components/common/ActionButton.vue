<template>
  <v-tooltip :text="tooltip" location="top">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" :icon="icon" @click="$emit('click')"></v-btn>
    </template>
  </v-tooltip>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

defineProps<{
  icon: string;
  tooltip: string;
}>();

defineEmits(["click"]);
</script>
