<template>
  <header
    class="bg-gray5 flex flex-column rounded-lg sticky pt-7 pb-6 top-0 w-full"
  >
    <div
      @click="toggleNav"
      class="flex flex-col absolute cursor-pointer left-5 top-5 z-10"
    >
      <span class="w-6 h-0.5 mb-1 bg-white"></span>
      <span class="w-6 h-0.5 mb-1 bg-white"></span>
      <span class="w-6 h-0.5 bg-white"></span>
    </div>
    <router-link
      v-if="user"
      :to="{ name: 'Home' }"
      class="w-7 h-7 bg-gray6 rounded-full absolute right-3.5 top-3.5"
    >
      <ChevronLeftIcon
        class="text-white w-5 h-5 mr-2 absolute top-1 left-0.5"
      />
    </router-link>
    <transition
      enter-active-class="duration-200 ease-out"
      enter-from-class="-translate-x-72"
      enter-to-class="translate-x-0"
      leave-active-class="duration-200 ease-in"
      leave-to-class="-translate-x-72"
      name="navigation"
    >
      <ul
        v-show="mobileNav"
        class="text-white bg-gradient-to-r from-gray5 fixed top-0 left-0 flex flex-col mt-6 h-full w-72"
      >
        <router-link
          @click="toggleNav"
          v-if="user"
          class="border-1 border-white rounded-md mt-20 mb-6 ml-5 flex"
          :to="{ name: 'Home' }"
          ><homeIcon class="w-5 h-5 mr-2" />Home</router-link
        >
        <router-link
          @click="toggleNav"
          v-if="user"
          class="mb-6 border-1 rounded-md ml-5 flex"
          :to="{ name: 'Create' }"
          ><PlusSmIcon class="w-5 h-5 mr-2" />Create</router-link
        >
        <router-link
          @click="toggleNav"
          v-if="!user"
          class="mb-6 border-1 rounded-md ml-5 mt-10"
          :to="{ name: 'Login' }"
          >Login</router-link
        >
        <li
          v-if="user"
          @click="
            logoutUser();
            toggleNav();
          "
          class="cursor-pointer rounded-md ml-6 flex"
        >
          <LogoutIcon class="w-4 h-5 mr-2" />
          Logout
        </li>
      </ul>
    </transition>
  </header>
</template>

<script>
import {
  HomeIcon,
  PlusSmIcon,
  LogoutIcon,
  ChevronLeftIcon,
} from "@heroicons/vue/outline";
import store from "../store/index";
import { computed } from "vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
export default {
  components: { HomeIcon, PlusSmIcon, LogoutIcon, ChevronLeftIcon },
  data() {
    return { mobileNav: false };
  },
  methods: {
    toggleNav() {
      this.mobileNav = !this.mobileNav;
    },
  },
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
