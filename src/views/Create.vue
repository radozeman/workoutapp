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
    <div
      class="text-white flex flex-col justify-center items-center max-w-fit mx-auto"
    >
      <!--Status Msg-->
      <div v-if="statusMsg || errorMsg">
        <p class="bg-green text-white text-center mt-4 px-2 pb-1 rounded-md">
          {{ statusMsg }}
        </p>
        <p class="bg-red text-white text-center mt-4 px-2 pb-1 rounded-md">
          {{ errorMsg }}
        </p>
      </div>
      <!--Add Wo-->
      <form
        @submit.prevent="createWorkout"
        class="flex justify-center items-center flex-col"
      >
        <!-- Workout name, date -->
        <label for="workout-name" class="mt-2">Workout Name</label>
        <input
          @click="addWorkout"
          type="text"
          required
          class="text-base text-center w-50 border-2 border-gray3 bg-gray3 rounded-md text-white pl-1 focus:outline-none"
          id="workout-name"
          v-model="workoutName"
        />
        <label for="workout-date" class="mt-2">Workout Date</label>
        <input
          type="text"
          required
          class="text-base text-center w-50 mb-4 border-2 border-gray3 bg-gray3 rounded-md text-white pl-1 focus:outline-none"
          id="workout-date"
          v-model="workoutDate"
        />
        <div class="mb-3" v-for="(item, index) in exercises" :key="index">
          <div class="flex flex-col text-center items-center rounded-t-md">
            <label for="exercise-name">Exercise</label>
            <input
              required
              type="text"
              class="text-base w-full text-center border-2 bg-gray3 border-gray3 rounded-md text-white pl-1 focus:outline-none"
              v-model="item.exercise"
            />
          </div>
          <div class="flex flex-wrap justify-center rounded-b-md mt-1">
            <div class="flex flex-col items-center mb-4">
              <label for="sets">Sets</label>
              <input
                required
                class="text-base w-14 text-center border-2 bg-gray3 border-gray3 rounded-md text-white focus:outline-none"
                type="text"
                v-model="item.sets"
              />
            </div>
            <div class="flex flex-col items-center mx-1">
              <label for="reps">Reps</label>
              <input
                required
                class="text-base w-14 text-center border-2 bg-gray3 border-gray3 rounded-md text-white focus:outline-none"
                type="text"
                v-model="item.reps"
              />
            </div>
            <div class="flex flex-col items-center mr-1">
              <label for="weight">Weight</label>
              <input
                required
                class="text-base w-14 text-center border-2 bg-gray3 border-gray3 rounded-md text-white focus:outline-none"
                type="text"
                v-model="item.weight"
              />
            </div>
            <div class="flex flex-col items-center">
              <label for="rest">Rest</label>
              <input
                required
                class="text-base w-14 text-center border-2 bg-gray3 border-gray3 rounded-md text-white focus:outline-none"
                type="text"
                v-model="item.rest"
              />
            </div>
          </div>
        </div>
        <button
          @click="addExercise"
          type="button"
          class="text-center p-1 px-3 pt-0 rounded-md bg-orange border-2 border-orange my-1 hover:text-white"
        >
          Add Exercise
        </button>
        <button
          type="submit"
          class="w-full text-center p-1 rounded-md bg-indigo border-2 border-indigo my-3 hover:text-white"
        >
          Save Workout
        </button>
      </form>
    </div>
  </transition>
</template>

<script>
import { supabase } from "../supabase";
import { ref } from "vue";
import { uid } from "uid";
export default {
  name: "create",
  components: {},
  setup() {
    const workoutDate = ref("");
    const workoutName = ref("");
    const exercises = ref([]);
    const statusMsg = ref(null);
    const errorMsg = ref(null);
    const addExercise = () => {
      exercises.value.push({
        id: uid(),
        exercise: "",
        sets: "",
        reps: "",
        weight: "",
        time: "",
      });
      return;
    };
    const deleteExercise = (id) => {
      if (exercises.value.length > 1) {
        exercises.value = exercises.value.filter(
          (exercise) => exercise.id !== id
        );
        return;
      }
      errorMsg.value = "Can't delete, you must have at least one exercise";
      setTimeout(() => {
        errorMsg.value = false;
      }, 5000);
    };
    const addWorkout = () => {
      exercises.value = [];
      addExercise();
    };
    const createWorkout = async () => {
      try {
        const { error } = await supabase.from("workouts").insert([
          {
            workoutName: workoutName.value,
            workoutDate: workoutDate.value,
            exercises: exercises.value,
          },
        ]);
        if (error) throw error;
        statusMsg.value = "Workout added successfully";
        workoutName.value = null;
        workoutDate.value = null;
        exercises.value = [];
        setTimeout(() => {
          statusMsg.value = false;
        }, 4000);
      } catch (error) {
        errorMsg.value = `${error.message}`;
        setTimeout(() => {
          errorMsg.value = false;
        }, 4000);
      }
    };
    return {
      workoutName,
      workoutDate,
      exercises,
      statusMsg,
      errorMsg,
      addExercise,
      addWorkout,
      deleteExercise,
      createWorkout,
    };
  },
};
</script>
