// import { defineStore } from "pinia";
// import { onAuthStateChanged } from "firebase/auth";
// import { getAuth } from "firebase/auth";
// import { reactive, onBeforeMount } from "vue";

// export const useUserStore = defineStore("user", () => {
//   const auth = getAuth();

//   const user = reactive({
//     email: "",
//     displayName: "",
//   });

//   const fetchUserData = () => {
//     onAuthStateChanged(auth, (currentUser) => {
//       if (currentUser) {
//         user.email = currentUser.email;
//         user.displayName = currentUser.displayName;
//       }
//     });
//   };

//   onBeforeMount(fetchUserData);

//   return {
//     user,
//     fetchUserData,
//   };
// });
