<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="none"
    class="spinner-overlay"
    data-testid="spinner-dialog"
  >
    <v-card flat data-testid="spinner-card">
      <v-card-title class="d-flex justify-center align-center" data-testid="spinner-title">
        <v-progress-circular
          indeterminate
          color="primary"
          size="64"
          class="d-flex mx-auto"
          data-testid="spinner-progress"
        ></v-progress-circular>
      </v-card-title>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    dialog: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit("update:modelValue", val);
      },
    },
  },
};
</script>

<style scoped>
.spinner-overlay .v-card {
  background-color: transparent;
  box-shadow: none;
}
.spinner-overlay .v-card-title {
  background-color: transparent;
  padding: 0;
}
.spinner-overlay .v-dialog__content {
  background-color: rgba(0, 0, 0, 0.5);
}
.spinner-overlay .v-progress-circular {
  color: #1976d2;
}
</style>
