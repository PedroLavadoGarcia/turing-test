<template>
  <v-dialog v-model="dialog" max-width="800px">
    <v-card class="dialog-card">
      <v-icon class="close-icon" @click="cancel">mdi-close</v-icon>
      <v-card-title class="dialog-title">
        {{ dialogTitle }}
      </v-card-title>
      <v-divider></v-divider>
      <v-form @submit.prevent="save" v-model="valid">
        <v-card-text>
          <v-text-field
            v-model="data.name"
            :rules="rules.requireField"
            label="Name"
            required
            outlined
          ></v-text-field>
          <v-textarea
            v-model="data.description"
            :rules="rules.requireField"
            label="Description"
            required
            outlined
            rows="5"
          ></v-textarea>
          <v-text-field
            v-model="data.personality"
            :rules="rules.requireField"
            label="Base Personality"
            required
            outlined
          ></v-text-field>
          <v-select
            v-model="data.traits"
            :items="lists.lisTraits"
            :rules="rules.requireField"
            label="Personality Traits"
            required
            outlined
          ></v-select>
          <v-select
            v-model="data.use"
            :items="lists.listUse"
            :rules="rules.requireField"
            label="Case of Use"
            required
            outlined
          ></v-select>
          <v-select
            v-model="data.state"
            :items="lists.listState"
            :rules="rules.requireField"
            label="State"
            required
            outlined
          ></v-select>
          <small class="text-caption">
            * Information needed to create a chat bot
          </small>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="dialog-actions">
          <v-btn @click="cancel">Close</v-btn>
          <v-btn
            color="primary"
            :text="dialogTitle.includes('Edit') ? 'Edit' : 'Save'"
            type="submit"
          ></v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from "vue";
import CONSTANTS_BOTS from "@/constant/constant.bots";
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  item: { type: Object, default: () => ({}) },
  value: { type: Boolean, required: true },
});

const emit = defineEmits(["input", "save", "create", "cancel"]);

const dialog = computed({
  get: () => props.value,
  set: (v) => emit("input", v),
});

const data = ref<any>({
  id: "",
  name: "",
  description: "",
  personality: "",
  traits: "",
  use: "",
  state: "",
});

const dialogTitle = computed(() =>
  data.value.id ? `Edit Bot ${data.value.name}` : "New Bot"
);

const rules = {
  requireField: [(value: any) => !!value || "This field is required."],
};

const lists = CONSTANTS_BOTS;

const valid = ref(false);

const save = async () => {
  if (valid.value) {
    dialog.value = false;
    emit(data.value.id ? "save" : "create", { ...data.value });
  }
};

const cancel = () => {
  dialog.value = false;
  emit("cancel");
};

onMounted(() => updateDataFromProps());

watch(
  () => props.item,
  () => updateDataFromProps()
);

function updateDataFromProps() {
  data.value = { ...props.item };
}
</script>

<style scoped>
.dialog-card {
  width: 100%;
  max-width: 800px;
  background-color: var(--color-background-light);
  color: var(--color-text-primary);
  border-radius: 8px;
}

.dialog-title {
  font-size: 1.75rem;
  font-weight: 500;
  margin-top: 24px;
}

.close-icon {
  position: absolute;
  right: 16px;
  top: 16px;
  cursor: pointer;
  color: var(--color-text-secondary);
}

.dialog-actions {
  padding: 16px;
  background-color: var(--color-background-light);
  display: flex;
  justify-content: flex-end;
}

.dialog-actions > .v-btn {
  margin-left: 8px;
  min-width: 100px;
}

.text-caption {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}
</style>
