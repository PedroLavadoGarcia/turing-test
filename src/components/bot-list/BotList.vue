<template>
  <section class="view">
    <v-card class="table-container">
      <v-data-table :items="items" :headers="headers" fixed-header theme="dark">
        <template v-slot:top>
          <v-btn color="primary" dark class="mb-2" @click="newChat()">
            New Chat
          </v-btn>
        </template>

        <template v-slot:[`item.icons`]="{ item }">
          <v-btn icon="mdi-pencil" @click="editChat(item)"></v-btn>
          <v-btn icon="mdi-delete" @click="deleteChat(item)"></v-btn>
        </template>
      </v-data-table>
    </v-card>
    <ModalBotInfo
      :item="itemSelected"
      :value="dialogSuccess"
      @cancel="dialogSuccess = false"
      @save="dialogSuccess = false"
      @create="createChat"
    />
  </section>
</template>

<script setup lang="ts">
import { collection, onSnapshot } from "firebase/firestore";
import { onMounted, ref } from "vue";
import { createBot, ModelBot, deleteBot } from "../../services/serviceBots";
import { db } from "@/utils/firebase";

const headers = [
  { title: "Name", value: "name", sortable: true },
  { title: "Description", value: "description", sortable: true },
  { title: "Personality", value: "personality", sortable: true },
  { title: "Traits", value: "traits", sortable: true },
  { title: "Use", value: "use", sortable: true },
  { title: "State", value: "state", sortable: true },
  { title: "", value: "icons" },
];

const items = ref<ModelBot[]>([]);
const dialogSuccess = ref<boolean>(false);
const itemSelected = ref<ModelBot | Object>({});

onMounted(async () => {
  onSnapshot(collection(db, "bots"), (querySnapshot) => {
    const fbBots: any = [];
    querySnapshot.forEach((bot) => {
      fbBots.push({ id: bot.id, ...bot.data() });
    });
    items.value = fbBots;
  });
});

function newChat() {
  itemSelected.value = {};
  dialogSuccess.value = true;
}

function createChat(item: ModelBot) {
  dialogSuccess.value = false;
  createBot(item);
}

function deleteChat(item: ModelBot) {
  deleteBot(item);
}

function editChat(item: ModelBot) {
  itemSelected.value = item;
  dialogSuccess.value = true;
}
</script>

<style>
.view {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.table-container {
  display: flex;
  flex-grow: 1;
  overflow: hidden;
}

.flex-table {
  display: flex;
  flex-grow: 1;
  width: 100%;
}

.flex-table > div {
  width: 100%;
}
</style>
