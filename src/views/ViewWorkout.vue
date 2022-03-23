<template>
  <div></div>
</template>

<script>
import { ref } from "vue";
import { supabase } from "../supabase";
import { useRoute } from "vue-router";
export default {
  name: "view-workout",
  components: {},
  setup() {
    const data = ref(null);
    const dataLoaded = ref(null);
    const errorMsg = ref(null);
    const statusMsg = ref(null);
    const route = useRoute();
    const currentId = route.params.workoutId;
    const getData = async () => {
      try {
        const { data: workouts, error } = await supabase
          .from("workouts")
          .select("*")
          .eq("id", currentId);
        if (error) throw error;
        data.value = workouts;
        dataLoaded.value = true;
      } catch (error) {
        errorMsg.value = error.message;
        setTimeout(() => {
          errorMsg.value = false;
        }, 4000);
      }
    };
    getData();
    return { statusMsg, data, dataLoaded, errorMsg };
  },
};
</script>
