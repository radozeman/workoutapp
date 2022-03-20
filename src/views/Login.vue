<template>
  <div class="">
    <!-- Errors -->
    <div v-if="errorMsg" class="">
      <p>{{ errorMsg }}</p>
    </div>
    <!-- Login Form -->
    <div class="">
      <form @submit.prevent="loginUser">
        <label for="email">Email</label>
        <input type="text" required id="email" v-model="email" />
        <label for="password">Password</label>
        <input type="password" required id="password" v-model="password" />
        <button type="submit">Login</button>
        <router-link class="" :to="{ name: 'Register' }"
          >Don't have an account? <span class="">Register</span></router-link
        >
      </form>
    </div>
  </div>
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
        }, 5000);
      }
    };

    return { email, password, errorMsg, loginUser };
  },
};
</script>
