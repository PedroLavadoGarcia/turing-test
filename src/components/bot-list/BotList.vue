<template>
  <section class="view">
    <app-confirm-dialog
      text="¿Estás seguro?"
      @cancel="dialogConfirm = false"
      @confirm="eventConfirm"
      :value="dialogConfirm"
    />
    <v-card class="table-container">
      <v-data-table :items="items" :headers="headers" fixed-header theme="dark">
        <template v-slot:top>
          <v-btn
            prepend-icon="mdi-robot"
            color="primary"
            dark
            class="mb-2"
            @click="openDetail()"
          >
            Nuevo Bot
          </v-btn>
        </template>
        <template v-slot:[`item.description`]="{ item }">
          <tooltip-ellipsis :text="item.description" />
        </template>
        <template v-slot:[`item.personality`]="{ item }">
          <tooltip-ellipsis :text="item.personality" />
        </template>
        <template v-slot:[`item.icons`]="{ item }">
          <div class="d-flex action-buttons">
            <action-button
              icon="mdi-pencil"
              tooltip="Editar"
              @click="openDetail(item)"
            />
            <action-button
              icon="mdi-delete"
              tooltip="Eliminar"
              @click="deleteDialog(item)"
            />
          </div>
        </template>
      </v-data-table>
    </v-card>
    <modal-bot-info
      :item="itemSelected"
      :value="dialogDetail"
      @cancel="dialogDetail = false"
      @save="saveDialog"
      @create="createDialog"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  collection,
  onSnapshot,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import {
  createBot,
  deleteBot,
  updateBot,
  ModelBot,
} from "../../services/serviceBots";
import { db } from "@/utils/firebase";

const headers: any[] = [
  { title: "Nombre", value: "name", sortable: true },
  { title: "Descripción", value: "description", sortable: true },
  { title: "Personalidad", value: "personality", sortable: true },
  { title: "Rasgos", value: "traits", sortable: true },
  { title: "Uso", value: "use", sortable: true },
  { title: "Estado", value: "state", sortable: true },
  { title: "", value: "icons", align: "center" },
];
const items = ref<ModelBot[]>([]);
const dialogConfirm = ref<boolean>(false);
const dialogDetail = ref<boolean>(false);
const itemSelected = ref<ModelBot | Object>({});
const eventConfirm = ref<() => void>();

onMounted(async () => {
  onSnapshot(collection(db, "bots"), (querySnapshot) => {
    const fbBots: ModelBot[] = querySnapshot.docs.map(
      (bot: QueryDocumentSnapshot<DocumentData>) => {
        const botData = bot.data();
        return {
          id: bot.id,
          name: botData.name || "",
          description: botData.description || "",
          personality: botData.personality || "",
          traits: botData.traits || "",
          use: botData.use || "",
          state: botData.state || "",
        };
      }
    );
    items.value = fbBots;
  });
});

function openDialog(item: ModelBot, action: (item: ModelBot) => void) {
  eventConfirm.value = () => action(item);
  dialogConfirm.value = true;
}

function saveDialog(item: ModelBot) {
  openDialog(item, saveChat);
}

function createDialog(item: ModelBot) {
  openDialog(item, createChat);
}

function deleteDialog(item: ModelBot) {
  openDialog(item, deleteChat);
}

function saveChat(item: ModelBot) {
  updateBot(item);
  dialogDetail.value = false;
  dialogConfirm.value = false;
}

function createChat(item: ModelBot) {
  createBot(item);
  dialogDetail.value = false;
  dialogConfirm.value = false;
}

function deleteChat(item: ModelBot) {
  deleteBot(item);
  dialogConfirm.value = false;
}

function openDetail(item?: ModelBot) {
  itemSelected.value = item || {};
  dialogDetail.value = true;
}
</script>

<style lang="scss" scoped>
.view {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.table-container {
  display: flex;
  flex-grow: 1;
  overflow: hidden;

  .table-container__ellipsis {
    max-width: 300px;

    @media (min-width: 768px) and (max-width: 1024px) {
      max-width: 100px;
    }

    @media (max-width: 767px) {
      max-width: 50px;
    }

    & .ellipsis {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  .v-data-table {
    background-color: #2c2c2c;
    color: #ffffff;
  }
}

.action-buttons {
  gap: 8px;
}

.action-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #ffffff;
  font-size: 16px;
  transition: color 0.3s ease;

  &:hover {
    color: #1976d2;
  }
}

.tooltip {
  background-color: #212121;
  color: #ffffff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.tooltip-arrow {
  border-color: #212121 transparent transparent transparent;
}
</style>
