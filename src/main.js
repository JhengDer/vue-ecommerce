// import './assets/variables.css'

import { createApp, onMounted } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import "virtual:svg-icons-register"; //自動處理svg
import { useAuthStore } from './stores/authStore';



const pinia=createPinia();
const app = createApp(App)

app.use(pinia);

const authStore=useAuthStore()

const initAuthState=()=>{
    const savedUser=localStorage.getItem('user');
    if(savedUser){
        const user=JSON.parse(savedUser);
        authStore.setUser(user);
    }
}

app.use(router);

app.mount('#app');
initAuthState();