import { tablesMock, formDataMock, lineCodesMock } from "@/mock/";
// import axios from "axios";

// const API_BASE_URL = "https://api.example.com";

// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

export const getData = async () => {
  try {
    const response = { data: formDataMock };
    // const response = await apiClient.get('/data');
    return response.data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error;
  }
};

export const saveData = async () => {
  try {
    const response = { data: true };
    // const response = await apiClient.post("/data", formData);
    return response.data;
  } catch (error) {
    console.error("Error al guardar datos:", error);
    throw error;
  }
};

export const getLineCodes = async () => {
  try {
    // const response = await apiClient.get('/line-codes');
    const response = { data: lineCodesMock };
    return response.data;
  } catch (error) {
    console.error("Error al obtener line codes:", error);
    throw error;
  }
};

export const getTables = async () => {
  try {
    // const response = await apiClient.get('/tables');
    const response = { data: tablesMock };
    return response.data;
  } catch (error) {
    console.error("Error al obtener tablas:", error);
    throw error;
  }
};
