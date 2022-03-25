<template>
  <div class="flex justify-center items-center min-h-screen bg-black px-2">
    <div
      class="container h-full bg-gray-800 flex flex-col rounded-lg max-w-2xl text-sm"
    >
      <Navigation />
      <router-view />
    </div>
  </div>
</template>

<script>
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
<style>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap");
</style>
