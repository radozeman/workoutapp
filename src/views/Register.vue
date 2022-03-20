<template>
  <div class="register-container">
    <!-- Errors -->
    <div v-if="errorMsg" class="errormsg">
      <p>{{ errorMsg }}</p>
    </div>
    <!-- Register Form -->
    <div class="form-container">
      <form @submit.prevent="registerUser">
        <label for="email">Email</label>
        <input type="text" required id="email" v-model="email" />
        <label for="password">Password</label>
        <input type="password" required id="password" v-model="password" />
        <label for="confirmPassword">Confirm Password</label>
        <input
          type="password"
          required
          id="confirmPassword"
          v-model="confirmPassword"
        />
        <button type="submit">Register</button>
        <router-link class="login-text" :to="{ name: 'Login' }"
          >Already have account? <span class="ksk">LogIn</span></router-link
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
