<template>
  <v-dialog v-model="dialog" max-width="800px">
    <v-card class="dialog-card">
      <v-icon class="close-icon" @click="cancel">mdi-close</v-icon>
      <v-card-title class="dialog-title">
        {{ dialogTitle }}
      </v-card-title>
      <v-divider></v-divider>
      <v-form @submit.prevent="save" ref="form">
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
          <v-row>
            <v-col cols="12" sm="4">
              <v-select
                v-model="data.traits"
                :items="lists.lisTraits"
                :rules="rules.requireField"
                label="Personality Traits"
                required
                outlined
              ></v-select>
            </v-col>
            <v-col cols="12" sm="4">
              <v-select
                v-model="data.use"
                :items="lists.listUse"
                :rules="rules.requireField"
                label="Case of Use"
                required
                outlined
              ></v-select>
            </v-col>
            <v-col cols="12" sm="4">
              <v-select
                v-model="data.state"
                :items="lists.listState"
                :rules="rules.requireField"
                label="State"
                required
                outlined
              ></v-select>
            </v-col>
          </v-row>
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
import { computed, ref, onMounted } from "vue";
import CONSTANTS_BOTS from "@/constant/constant.bots";
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
  value: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["input", "save", "create", "cancel"]);

const dialog = computed({
  get: () => props.value,
  set: (v) => emit("input", v),
});

const data = ref({
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

const form = ref();

const save = async () => {
  const { valid } = await form.value.validate();
  if (valid) {
    dialog.value = false;
    data.value.id
      ? emit("save", { ...data.value })
      : emit("create", { ...data.value });
  }
};

const cancel = () => {
  dialog.value = false;
  emit("cancel");
};

onMounted(() => {
  Object.assign(data.value, props.item);
});
</script>

<style lang="scss" scoped>
.dialog-card {
  width: 100%;
  max-width: 800px;
  background-color: #f5f5f5;
  color: #333;
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
  color: #666;
}

.dialog-actions {
  padding: 16px;
  background-color: #f5f5f5;
  display: flex;
  justify-content: flex-end;
}

.dialog-actions > .v-btn {
  margin-left: 8px;
  min-width: 100px;
}

.text-caption {
  font-size: 0.875rem;
  color: #666;
}
</style>
