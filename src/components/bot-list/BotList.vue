<template>
  <section class="view">
    <app-confirm-dialog
      text="You're sure?"
      @cancel="dialogConfirm = false"
      @confirm="eventConfirm"
      :value="dialogConfirm"
    />
    <app-alert
      :show="alert.show"
      :type="alert.type"
      :message="alert.message"
      @dismiss="dismissAlert"
    />
    <v-card class="table-container">
      <v-data-table :items="items" :headers="headers" fixed-header theme="dark">
        <template v-slot:top>
          <div class="table-header">
            <h1 class="table-title">Bot Management</h1>
            <v-btn
              prepend-icon="mdi-robot"
              color="primary"
              dark
              class="new-bot-btn"
              @click="openDetail()"
            >
              New Bot
            </v-btn>
          </div>
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
  { title: "Name", value: "name", sortable: true },
  { title: "Description", value: "description", sortable: true },
  { title: "Personality", value: "personality", sortable: true },
  { title: "Traits", value: "traits", sortable: true },
  { title: "Use", value: "use", sortable: true },
  { title: "State", value: "state", sortable: true },
  { title: "", value: "icons", align: "center" },
];
const items = ref<ModelBot[]>([]);
const dialogConfirm = ref<boolean>(false);
const dialogDetail = ref<boolean>(false);
const itemSelected = ref<ModelBot | Object>({});
const eventConfirm = ref<() => void>();
const alert = ref<{
  show: boolean;
  type: "success" | "info" | "warning" | "error";
  message: string;
}>({
  show: false,
  type: "info",
  message: "",
});

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

  showAlert("Bot updated successfully", "success");
}

function createChat(item: ModelBot) {
  createBot(item);
  dialogDetail.value = false;
  dialogConfirm.value = false;

  showAlert("Bot created successfully", "success");
}

function deleteChat(item: ModelBot) {
  deleteBot(item);
  dialogConfirm.value = false;

  showAlert("Bot deleted successfully", "success");
}

function openDetail(item?: ModelBot) {
  itemSelected.value = item || {};
  dialogDetail.value = true;
}

function showAlert(
  message: string,
  type: "success" | "info" | "warning" | "error" = "info"
) {
  alert.value.show = true;
  alert.value.message = message;
  alert.value.type = type;
}

function dismissAlert() {
  alert.value.show = false;
  alert.value.message = "";
  alert.value.type = "info";
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
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #37474f;
  color: #ffffff;
  border-bottom: 1px solid #444;
}

.table-title {
  margin: 0;
  font-size: 28px;
  font-weight: bold;
  color: #80d8ff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

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

.new-bot-btn {
  font-size: 14px;
  font-weight: bold;
  padding: 8px 16px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    background-color: #1e88e5;
    transform: translateY(-2px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }
}
</style>
