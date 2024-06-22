<template>
  <transition name="fade">
    <div v-if="show">
      <v-alert
        :type="type"
        closable
        @input="dismissAlert"
        :class="['my-custom-alert', type]"
      >
        {{ message }}
      </v-alert>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { watch, PropType } from "vue";

const props = defineProps({
  show: Boolean,
  type: {
    type: String as PropType<
      "success" | "warning" | "error" | "info" | undefined
    >,
    required: true,
  },
  message: String,
});

const emit = defineEmits(["dismiss"]);

function dismissAlert() {
  emit("dismiss");
}

watch(
  () => props.show,
  (newVal: boolean) => {
    if (newVal) {
      setTimeout(() => {
        dismissAlert();
      }, 2000);
    }
  }
);
</script>

<style scoped>
.my-custom-alert {
  font-size: 14px;
  padding: 8px 12px;
  box-shadow: var(--color-shadow);
  text-align: left;
  line-height: 1.4;
}

.my-custom-alert.success {
  background-color: var(--color-success);
  color: var(--color-text-primary);
}

.my-custom-alert.warning {
  background-color: var(--color-warning);
  color: var(--color-text-primary);
}

.my-custom-alert.error {
  background-color: var(--color-error);
  color: var(--color-text-primary);
}

.my-custom-alert.info {
  background-color: var(--color-info);
  color: var(--color-text-primary);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
