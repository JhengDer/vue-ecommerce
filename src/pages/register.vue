<script setup>
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDataStore } from "../stores/data";
import { useAuthStore } from "../stores/authStore";
const { register } = useAuthStore();
const { auth } = useDataStore();
const user = reactive({
  name: "",
  email: "",
  password: "",
});
const errorText = ref("");
const router = useRouter();
const userRegistration1 = () => {
  createUserWithEmailAndPassword(auth, user.email, user.password)
    .then((res) => {
      // console.log("origin", res);
      register(res, user.name);
      updateProfile(res.user, {
        displayName: user.name,
      })
        .then((res) => {
          router.push("/login");
        })
        .catch((error) => {
          errorText.value = error.message.slice(22);
          errorText.value = errorText.value.slice(0, -2);
        });
    })
    .catch((error) => {
      errorText.value = error.message.slice(22);
      errorText.value = errorText.value.slice(0, -2);
    });
};
</script>
<template>
  <div class="container">
    <form @submit.prevent="userRegistration1">
      <h3>註冊</h3>
      <div class="form-group">
        <label for="userName">名稱</label>
        <input type="text" id="userName" v-model="user.name" required/>
      </div>
      <div class="form-group">
        <label for="userEmail">Email</label>
        <input type="Email" id="userEmail" v-model="user.email" required/>
      </div>

      <div class="form-group">
        <label for="userPassword">密碼</label>
        <input type="Password" id="userPassword" v-model="user.password" required/>
      </div>
      <button type="submit">註冊</button>
      <p class="error-message">{{ errorText }}</p>
      <p>
        已經註冊過了?
        <router-link to="/login">登入</router-link>
      </p>
    </form>
  </div>
</template>
<style lang="scss" scoped>
.error-message {
  font-size: 80%;
  color: rgb(255, 116, 116);
}
</style>
