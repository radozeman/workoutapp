<template>
  <div class="flex justify-center items-center w-full flex-col pb-4">
    <!-- Errors -->
    <div
      v-if="errorMsg"
      class="bg-red text-white text-center mt-4 px-2 pb-1 rounded-md"
    >
      <p>{{ errorMsg }}</p>
    </div>
    <!-- Register Form -->
    <form @submit.prevent="registerUser" class="flex flex-col mx-auto w-60">
      <label for="email" class="text-white mt-2">Email</label>
      <input
        type="text"
        required
        class="text-base mb-2 border-2 bg-gray3 border-gray3 rounded-md py-0 text-white pl-1 focus:outline-none"
        id="email"
        v-model="email"
      />
      <label for="password" class="text-white">Password</label>
      <input
        type="password"
        required
        class="text-base mb-2 border-2 bg-gray3 border-gray3 rounded-md py-0 text-white pl-1 focus:outline-none"
        id="password"
        v-model="password"
      />
      <label for="confirmPassword" class="text-white">Confirm Password</label>
      <input
        class="text-base mb-2 border-2 bg-gray3 border-gray3 rounded-md py-0 text-white pl-1 focus:outline-none"
        type="password"
        required
        id="confirmPassword"
        v-model="confirmPassword"
      />
      <button
        type="submit"
        class="p-1 rounded-md border-2 bg-indigo border-indigo my-3 text-white"
      >
        Register
      </button>
      <router-link class="text-white text-center" :to="{ name: 'Login' }"
        >Already have account?<span class="text-indigo">
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
