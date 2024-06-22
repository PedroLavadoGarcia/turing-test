<template>
  <v-dialog
    v-model="dialog"
    max-width="480px"
    @click:outside="cancel"
    @keydown.esc="cancel"
  >
    <v-card class="dialog-card">
      <v-icon class="close-icon" @click="cancel">mdi-close</v-icon>

      <v-card-title class="text-center">
        <v-icon x-large color="primary darken-1">
          mdi-sticker-alert-outline
        </v-icon>
        <div class="title">
          {{ text }}
        </div>
      </v-card-title>

      <v-card-text class="text-center">
        <div v-if="textSecond" class="dialog-content">
          {{ textSecond }}
        </div>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn color="primary" @click="confirmation">Confirm</v-btn>
        <v-btn @click="cancel">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "",
    },
    value: {
      type: Boolean,
      required: true,
    },
    textSecond: {
      type: String,
      default: "",
    },
  },

  computed: {
    dialog: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit("input", v);
      },
    },
  },

  methods: {
    cancel() {
      this.dialog = false;
      this.$emit("cancel");
    },
    confirmation() {
      this.dialog = false;
      this.$emit("confirm");
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-card {
  background-color: var(--color-background-light);
  color: var(--color-text-primary);
  border-radius: 8px;
  box-shadow: 0px 4px 8px var(--color-shadow);
}

.close-icon {
  font-size: 25px;
  position: absolute;
  top: 8px;
  right: 8px;
  color: var(--color-text-secondary);
  cursor: pointer;
}

.title {
  font-size: 1.5rem;
  margin-top: 16px;
}

.dialog-content {
  margin: 16px;
}

.v-btn {
  min-width: 120px;
}
</style>
