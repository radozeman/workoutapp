<template>
  <div class="flex justify-center items-center w-full flex-col">
    <!-- Errors -->
    <div
      v-if="errorMsg"
      class="bg-red-500 text-white text-center mt-4 px-2 pb-1 rounded-md"
    >
      <p>{{ errorMsg }}</p>
    </div>
    <!-- Register Form -->
    <form @submit.prevent="registerUser" class="flex flex-col mx-auto w-60">
      <label for="email" class="text-white mt-2">Email</label>
      <input
        type="text"
        required
        class="mb-1 border-2 border-gray-600 bg-gray-600 rounded-md py-0 text-white pl-1 focus:outline-none focus:border-2 focus:border-green-500"
        id="email"
        v-model="email"
      />
      <label for="password" class="text-white">Password</label>
      <input
        type="password"
        required
        class="mb-1 border-2 border-gray-600 bg-gray-600 rounded-md py-0 text-white pl-1 focus:outline-none focus:border-2 focus:border-green-500"
        id="password"
        v-model="password"
      />
      <label for="confirmPassword" class="text-white">Confirm Password</label>
      <input
        class="mb-1 border-2 border-gray-600 bg-gray-600 rounded-md py-0 text-white pl-1 focus:outline-none focus:border-2 focus:border-green-500"
        type="password"
        required
        id="confirmPassword"
        v-model="confirmPassword"
      />
      <button
        type="submit"
        class="p-1 rounded-md bg-green-500 border-2 border-green-500 my-3 hover:border-white hover:text-white"
      >
        Register
      </button>
      <router-link class="text-white text-center" :to="{ name: 'Login' }"
        >Already have account?<span class="text-green-500">
          LogIn
        </span></router-link
      >
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
export default {
  name: "register",
  components: {},
  setup() {
    const router = useRouter();
    const email = ref(null);
    const password = ref(null);
    const confirmPassword = ref(null);
    const errorMsg = ref(null);

    const registerUser = async () => {
      if (password.value === confirmPassword.value) {
        try {
          const { error } = await supabase.auth.signUp({
            email: email.value,
            password: password.value,
          });
          if (error) throw error;
          router.push({ name: "Login" });
        } catch (error) {
          errorMsg.value = error.message;
          setTimeout(() => {
            errorMsg.value = null;
          }, 5000);
        }
        return;
      }
      errorMsg.value = "Passowrds don't match";
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    };

    return { email, password, confirmPassword, errorMsg, registerUser };
  },
};
</script>
