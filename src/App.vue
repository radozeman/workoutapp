<template>
  <div>
    <Navigation />
    <router-view />
  </div>
</template>

<script>
import "./index.css";
import Navigation from "./components/Navigation.vue";
import { ref } from "vue";
import { supabase } from "./supabase";
import store from "./store/index";
export default {
  components: {
    Navigation,
  },
  setup() {
    const appReady = ref(null);
    const user = supabase.auth.user();
    if (!user) {
      appReady.value = true;
    }
    supabase.auth.onAuthStateChange((_, session) => {
      store.methods.setUser(session);
      appReady.value = true;
    });
    return { appReady };
  },
};
</script>
