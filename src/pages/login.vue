<script setup>
import { useDataStore } from "../stores/data";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthStore } from "../stores/authStore";

const { auth } = useDataStore();
const router = useRouter();
const { login } = useAuthStore();
const user = reactive({
  email: "",
  password: "",
});
const errorText=ref("");
const userLogin = () => {
  signInWithEmailAndPassword(auth, user.email, user.password)
    .then((res) => {
      login(res);
      // router.push("/");
      location.replace("/");
    })
    .catch((error) => {
      // errorText.value=error.message;
      errorText.value=error.message.slice(22);
      errorText.value=errorText.value.slice(0,-2);
      // alert(error.message);
    });
};
</script>
<template>
  <div class="container">
    <form @submit.prevent="userLogin">
      <h3>登入</h3>
      <div class="form-group">
        <label for="userEmail">Email</label>
        <input type="Email" id="userEmail" v-model="user.email" />
      </div>

      <div class="form-group">
        <label for="userPassword">密碼</label>
        <input type="Password" id="userPassword" v-model="user.password" />
      </div>
      <div class="error-message">
        {{ errorText }}
      </div>
      <button type="submit">登入</button>
      <button>
        <router-link to="/register">註冊</router-link>
      </button>
    </form>
  </div>
</template>
<style lang="scss"  scoped>
.error-message{
  font-size: 80%;
  color: rgb(255, 116, 116);
}
</style>
