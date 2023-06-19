import { defineStore } from "pinia";
import { useDataStore } from "./data";
import { ref as fireRef, update } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
export const useAuthStore = defineStore("auth", () => {
  // 匯入新會員資料
  const dataStore = useDataStore();
  const { db, auth } = dataStore;
  const memberRef = ref(null);
  // const membersRef = fireRef(db, "/members");
  // 是否為登入狀態
  const loggedIn = ref(false);
  const user = ref({});
  const userID = ref("");
  const userName = ref("");
  // 註冊時匯入會員資料到firebase
  const register = (userData, uName) => {
    const regisuser = userData.user.providerData[0];
    const UID = userData.user.uid;
    regisuser.uid = UID;
    memberRef.value = fireRef(db, `/members/${UID}`);
    update(memberRef.value, regisuser)
      .then(() => {
      })
      .catch((error) => {
        console.log("push fail", error);
      });
  };

  const login = (userData) => {
    // 登入狀態判定為true
    loggedIn.value = true;
    user.value = userData.user;
    userID.value = user.value.uid;
    localStorage.setItem("user", JSON.stringify(user.value));
  };

  const logout = () => {
    loggedIn.value = false;
    user.value = null;
    localStorage.removeItem("user");
  };
  const setUser = (userData) => {
    user.value = userData;
    userID.value = user.value.uid;
    loggedIn.value = true;
    localStorage.setItem("user", JSON.stringify(user.value));
  };

  onAuthStateChanged(auth,(user)=>{
    if(user){
      userName.value=user.displayName;
    }
  })


  return {
    loggedIn,
    user,
    login,
    logout,
    register,
    userID,
    setUser,userName
  };
});
