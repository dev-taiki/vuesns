import { createApp } from 'vue'
import App from './App.vue'
import store from './components/store'
import './services/api';

const app = createApp(App)
app.use(store)
app.mount('#app')
