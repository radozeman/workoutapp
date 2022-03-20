<template>
  <header class="bg-slate-700">
    <nav>
      <ul>
        <router-link v-if="user" class="" :to="{ name: 'Home' }"
          >Home</router-link
        >
        <router-link v-if="user" class="" :to="{ name: 'Create' }"
          >Create</router-link
        >
        <router-link v-if="!user" class="" :to="{ name: 'Login' }"
          >Login</router-link
        >
        <li v-if="user" @click="logoutUser" class="">Logout</li>
      </ul>
    </nav>
  </header>
</template>

<script>
import store from "../store/index";
import { computed } from "vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
export default {
  setup() {
    const user = computed(() => store.state.user);

    const router = useRouter();

    const logoutUser = async () => {
      await supabase.auth.signOut();
      router.push({ name: "Home" });
    };
    return { logoutUser, user };
  },
};
</script>
