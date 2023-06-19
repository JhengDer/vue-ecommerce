import { defineStore } from "pinia";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/compat/auth";
import { getDatabase, ref as fireRef, push, get } from "firebase/database";
import { getAuth } from "firebase/auth";
import {  reactive } from "vue";

export const useDataStore = defineStore("data", () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDQ6ghhY4cBnrlzNicQ5uP2h-NNNLXlzDs",
    authDomain: "vite-ecommerce-7b73e.firebaseapp.com",
    projectId: "vite-ecommerce-7b73e",
    storageBucket: "vite-ecommerce-7b73e.appspot.com",
    messagingSenderId: "842649475011",
    appId: "1:842649475011:web:0a23bc2b7a8e67bb6d8f76",
    measurementId: "G-FMZS4Y3FW4",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const dataRef = fireRef(db, "/");
  const datares = reactive({
    category: {},
    data: {},
    deadline: {},
  });

  const allArr = ref(null);
  const auth = getAuth(app);

  const fetchData = async () => {
    const res = await get(dataRef, db);
    const receiveRes = res.val();
    datares.category = receiveRes.category;
    datares.data = receiveRes.data;
    datares.deadline = receiveRes.event;
  };
  const storeAllArr = (arr, idx) => {
    allArr.value = arr;
  };
  fetchData();
  return { datares, fetchData, auth, storeAllArr, allArr, db };
});
