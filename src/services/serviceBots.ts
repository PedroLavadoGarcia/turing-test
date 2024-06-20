import { db } from "@/utils/firebase";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export interface ModelBot {
  id: string;
  name: string;
  description: string;
  personality: string;
  traits: string;
  use: string;
  state: string;
}

export function deleteBot(item: ModelBot) {
  deleteDoc(doc(db, "bots", item.id));
}

export function updateBot(item: ModelBot) {
  updateDoc(doc(db, "bots", item.id), { ...item });
}

export function createBot(item: ModelBot) {
  addDoc(collection(db, "bots"), item);
}
