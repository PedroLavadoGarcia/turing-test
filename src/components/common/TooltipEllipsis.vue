<template>
  <div class="table-container__ellipsis">
    <v-tooltip :text="text" location="top" :disabled="text.length < 50">
      <template v-slot:activator="{ props }">
        <div v-bind="props" class="ellipsis">
          {{ text }}
        </div>
      </template>
    </v-tooltip>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps<{
  text: string;
}>();
</script>

<style scoped>
.ellipsis {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
