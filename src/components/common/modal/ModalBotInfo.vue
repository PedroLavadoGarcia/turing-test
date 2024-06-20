<template>
  <v-dialog v-model="dialog" @click:outside="cancel" @keydown.esc="cancel">
    <v-card
      prepend-icon="mdi-earth"
      :title="item.id ? ' Edita el bot' : 'Nuevo bot'"
    >
      <v-divider class="mt-3"></v-divider>
      <v-card-text>
        <v-row dense>
          <v-col cols="12">
            <v-text-field
              v-model="data.name"
              label="Name"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-textarea
              v-model="data.description"
              label="Description"
              persistent-hint
              required
            ></v-textarea>
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="data.personality"
              label="Personalidad base"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="4">
            <v-select
              v-model="data.traits"
              :items="lists.lisTraits"
              label="Rasgos de personalidad"
              required
            ></v-select>
          </v-col>
          <v-col cols="12" sm="4">
            <v-select
              v-model="data.use"
              :items="lists.listUse"
              label="Casos de uso"
              required
            ></v-select>
          </v-col>
          <v-col cols="12" sm="4">
            <v-select
              v-model="data.state"
              :items="lists.listState"
              label="Estado"
              required
            ></v-select>
          </v-col>
        </v-row>

        <small class="text-caption text-medium-emphasis"
          >*Informacion necesaria para crear un chat bot</small
        >
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn text="Close" @click="cancel"></v-btn>

        <v-spacer></v-spacer>
        <v-btn
          color="surface-variant"
          :text="item.id ? 'Edit' : 'Save'"
          variant="flat"
          @click="save"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import CONSTANTS_BOTS from "@/constant/constant.bots";
export default {
  components: {},

  props: {
    item: {
      type: Object,
      default: null,
    },
    value: {
      type: Boolean,
      required: true,
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
    data() {
      return this.item;
    },
  },

  data() {
    return {
      radio: "",
      lists: CONSTANTS_BOTS,
    };
  },

  methods: {
    save() {
      this.dialog = false;
      this.item.id ? this.$emit("save") : this.$emit("create", this.data);
    },
    cancel() {
      this.dialog = false;
      this.$emit("cancel");
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  line-height: 1rem;
}

.v-card__title {
  background-color: #4caf50 !important;
  color: white;
}

.close {
  font-size: 25px;
  position: absolute;
  right: 4px;
  color: grey;
}
</style>
