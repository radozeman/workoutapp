<template>
  <transition
    appear
    enter-active-class="duration-500 ease-all"
    enter-from-class="transform opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="duration-500 ease-all"
    leave-from-class="opacity-100"
    leave-to-class="transform opacity-0"
  >
    <div class="flex justify-center items-center w-full flex-col pb-4">
      <!-- Errors -->
      <div
        v-if="errorMsg"
        class="bg-red text-white text-center mt-4 px-2 pb-1 rounded-md"
      >
        <p>{{ errorMsg }}</p>
      </div>
      <!-- Login Form -->
      <form @submit.prevent="loginUser" class="flex flex-col mx-auto w-60">
        <label for="email" class="text-white mt-2">Email</label>
        <input
          type="text"
          required
          id="email"
          class="mb-1 border-2 select text-base bg-gray3 border-gray3 rounded-md text-white pl-1 focus:outline-none"
          v-model="email"
        />
        <label for="password" class="text-white">Password</label>
        <input
          type="password"
          required
          id="password"
          class="mb-1 border-2 bg-gray3 border-gray3 rounded-md py-0 text-white pl-1 focus:outline-none text-base"
          v-model="password"
        />
        <button
          type="submit"
          class="p-1 rounded-md bg-indigo border-2 border-indigo my-3 text-white"
        >
          Login
        </button>
        <router-link class="text-white text-center" :to="{ name: 'Register' }"
          >Don't have an account?<span class="text-indigo">
            Register
          </span></router-link
        >
      </form>
      <div
        class="text-white mt-4 flex flex-col justify-center items-start border-2 border-orange rounded-md p-5 pb-6"
      >
        <p class="text-lg text-orange">Try without registration</p>
        <p class="mt-1 mb-1">Email : demou3556@gmail.com</p>
        <p>Password : demou3556</p>
      </div>
    </div>
  </transition>
</template>

<script>
import { ref } from "vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
export default {
  name: "login",
  components: {},
  setup() {
    const router = useRouter();
    const email = ref(null);
    const password = ref(null);
    const errorMsg = ref(null);

    const loginUser = async () => {
      try {
        const { error } = await supabase.auth.signIn({
          email: email.value,
          password: password.value,
        });
        if (error) throw error;
        router.push({ name: "Home" });
      } catch (error) {
        errorMsg.value = `${error.message}`;
        setTimeout(() => {
          errorMsg.value = null;
        }, 4000);
      }
    };

    return { email, password, errorMsg, loginUser };
  },
};
</script>
