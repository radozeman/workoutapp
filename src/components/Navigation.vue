<template>
  <header
    class="bg-gray5 flex justify-center items-center rounded-lg py-3 sticky top-0"
  >
    <nav>
      <ul class="text-white flex text-center">
        <router-link
          v-if="user"
          class="px-3 pb-1 mx-2 border-1 border-white rounded-md"
          :to="{ name: 'Home' }"
          >Home</router-link
        >
        <router-link
          v-if="user"
          class="px-3 mx-2 border-1 rounded-md"
          :to="{ name: 'Create' }"
          >Create</router-link
        >
        <router-link
          v-if="!user"
          class="px-3 pb-1 mx-2 border-1 rounded-md"
          :to="{ name: 'Login' }"
          >Login</router-link
        >
        <li
          v-if="user"
          @click="logoutUser"
          class="cursor-pointer px-3 mx-2 border-1 rounded-md"
        >
          Logout
        </li>
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
      router.push({ name: "Login" });
    };
    return { logoutUser, user };
  },
};
</script>
