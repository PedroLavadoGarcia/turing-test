<template>
  <v-dialog v-model="dialog" persistent max-width="400px" data-testid="confirm-dialog">
    <v-card>
      <v-card-title>
        <v-icon color="primary" data-testid="icon">mdi-alert-circle</v-icon>
        <span class="ml-2" data-testid="title">Confirm</span>
      </v-card-title>
      <v-card-subtitle class="mb-4" data-testid="subtitle">
        Do you want to save the changes?
      </v-card-subtitle>
      <v-card-actions>
        <v-btn text @click="closeDialog" data-testid="cancel-button">Cancel</v-btn>
        <v-btn color="primary" @click="confirm" data-testid="save-button">Save</v-btn>
      </v-card-actions>
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
        this.$emit('update:modelValue', val);
      },
    },
  },
  methods: {
    closeDialog() {
      this.dialog = false;
      this.$emit('close');
    },
    confirm() {
      this.dialog = false;
      this.$emit('confirm');
    },
  },
};
</script>
