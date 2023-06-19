import { defineStore, storeToRefs } from "pinia";
import { useAuthStore } from "./authStore";
import { useDataStore } from "./data";
import {
  ref as fireRef,
  get,
  update,
  remove,
} from "firebase/database";
import { reactive, watch } from "vue";

export const useCartStore = defineStore("cart", () => {
  const authStore = useAuthStore();
  const { userID } = storeToRefs(authStore);
  const { db } = useDataStore();
  const itemsRef = ref(null);
  const itemRef = ref(null);
  const itemID = ref("");

  const addCart = (choseData, size) => {
    const data = reactive(choseData.value);
    itemID.value = data.id;
    data.size = size;
    itemsRef.value = fireRef(db, `/members/${userID.value}/item`);
    itemRef.value = fireRef(
      db,
      `/members/${userID.value}/item/${itemID.value}`
    );
    fetchItemData(data, itemRef.value);
  };
  const removeCart = (choseItemID) => {
    const choseRef=fireRef(
      db,
      `/members/${userID.value}/item/${choseItemID}`
    );
    remove(choseRef);
  };
  const fetchItemData = async (data, itemRef) => {
    const res = await get(itemRef, db);
    const receiveRes = res.val();
    if (receiveRes == null) {
      const currentItemcol = data.itemcol || 0;
      data.itemcol = currentItemcol + 1;
      await update(itemRef, data);
    } else {
      data.itemcol = receiveRes.itemcol + 1;
      await update(itemRef, data);
    }
    showItems();
  };

  const showItems = async () => {
    itemsRef.value = fireRef(db, `/members/${userID.value}/item`);
    const res = await get(itemsRef.value, db);
    const receiveRes = res.val();
    // Object.keys(receiveRes).forEach((key) => {
    //   const item = receiveRes[key];
    //   console.log("item");
    //   console.log(item.id);
    //   console.log(item.name);
    // });
    if (receiveRes == null) {
      return 0;
    } else {
      return receiveRes;
    }
  };

  return { addCart, showItems, removeCart };
});
