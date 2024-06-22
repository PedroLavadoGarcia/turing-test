<template>
  <v-footer app class="footer">
    <div class="text-caption text-disabled">2016-2024</div>
  </v-footer>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.footer {
  background-color: var(--color-background-dark) !important;
  color: var(--color-text-primary) !important;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  .text-caption {
    color: rgba(255, 255, 255, 0.7) !important;
  }
}
</style>
