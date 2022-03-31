<template>
  <transition
    appear
    enter-active-class="duration-200 ease-all"
    enter-from-class="transform opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="duration-200 ease-all"
    leave-from-class="opacity-100"
    leave-to-class="transform opacity-0"
  >
    <div v-if="dataLoaded" class="flex flex-col">
      <div v-if="data.length == 0" class="flex flex-col justify-center my-2">
        <h1 class="text-center text-white">You haven't added workout yet</h1>
        <router-link :to="{ name: 'Create' }" class="text-center text-green">
          Add Workout
        </router-link>
      </div>
      <div
        v-else
        class="flex flex-col-reverse justify-center sm:items-center px-8 mt-5"
      >
        <router-link
          class="bg-gray5 cursor-pointer mb-4 pt-1 pb-2 rounded-md flex justify-between px-2 sm:w-80"
          :to="{ name: 'View-Workout', params: { workoutId: workout.id } }"
          v-for="(workout, index) in data"
          :key="index"
        >
          <p class="text-white text-center uppercase">
            {{ workout.workoutName }}
          </p>
          <p class="text-white text-center uppercase">
            {{ workout.workoutDate.split("-").reverse().join(".") }}
          </p>
        </router-link>
      </div>
    </div>
  </transition>
</template>

<script>
import { ref } from "vue";
import { supabase } from "../supabase";
export default {
  name: "home",
  components: {},
  setup() {
    const data = ref([]);
    const dataLoaded = ref(null);
    const getData = async () => {
      try {
        const { data: workouts, error } = await supabase
          .from("workouts")
          .select("*");
        if (error) throw error;
        data.value = workouts;
        dataLoaded.value = true;
      } catch (error) {
        console.warn(error.message);
      }
    };
    getData();
    return {
      data,
      dataLoaded,
    };
  },
};
</script>
