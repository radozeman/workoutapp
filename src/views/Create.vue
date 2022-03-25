<template>
  <div
    class="text-white flex flex-col justify-center items-center max-w-fit mx-auto"
  >
    <!--Status Msg-->
    <div v-if="statusMsg || errorMsg">
      <p class="bg-green-500 text-white text-center mt-4 px-2 pb-1 rounded-md">
        {{ statusMsg }}
      </p>
      <p class="bg-red-500 text-white text-center mt-4 px-2 pb-1 rounded-md">
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
        class="text-center w-50 border-2 border-gray-600 bg-gray-600 rounded-md text-white pl-1 focus:outline-none focus:border-2 focus:border-green-500"
        id="workout-name"
        v-model="workoutName"
      />
      <label for="workout-date" class="mt-2">Workout Date</label>
      <input
        type="text"
        required
        class="text-center w-50 mb-4 border-2 border-gray-600 bg-gray-600 rounded-md text-white pl-1 focus:outline-none focus:border-2 focus:border-green-500"
        id="workout-date"
        v-model="workoutDate"
      />
      <div class="mb-4" v-for="(item, index) in exercises" :key="index">
        <div
          class="flex flex-col text-center items-center bg-gray-900 rounded-t-md border-4 border-gray-900"
        >
          <label for="exercise-name">Exercise</label>
          <input
            required
            type="text"
            class="w-full text-center border-2 border-gray-600 bg-gray-600 rounded-md text-white pl-1 focus:outline-none focus:border-2 focus:border-green-500"
            v-model="item.exercise"
          />
        </div>
        <div
          class="flex flex-wrap justify-center bg-gray-900 rounded-b-md border-2 border-gray-900"
        >
          <div class="flex flex-col items-center mb-4">
            <label for="sets">Sets</label>
            <input
              required
              class="w-14 text-center border-2 border-gray-600 bg-gray-600 rounded-md text-white focus:outline-none focus:border-2 focus:border-green-500"
              type="text"
              v-model="item.sets"
            />
          </div>
          <div class="flex flex-col items-center mx-1">
            <label for="reps">Reps</label>
            <input
              required
              class="w-14 text-center border-2 border-gray-600 bg-gray-600 rounded-md text-white focus:outline-none focus:border-2 focus:border-green-500"
              type="text"
              v-model="item.reps"
            />
          </div>
          <div class="flex flex-col items-center mr-1">
            <label for="weight">Weight</label>
            <input
              required
              class="w-14 text-center border-2 border-gray-600 bg-gray-600 rounded-md text-white focus:outline-none focus:border-2 focus:border-green-500"
              type="text"
              v-model="item.weight"
            />
          </div>
          <div class="flex flex-col items-center">
            <label for="rest">Rest</label>
            <input
              required
              class="w-14 text-center border-2 border-gray-600 bg-gray-600 rounded-md text-white focus:outline-none focus:border-2 focus:border-green-500"
              type="text"
              v-model="item.rest"
            />
          </div>
        </div>
      </div>
      <button
        @click="addExercise"
        type="button"
        class="text-center mt-4 p-1 px-3 pt-0 rounded-md bg-orange-400 border-2 border-orange-400 my-3 hover:border-white hover:text-white"
      >
        Add Exercise
      </button>
      <button
        type="submit"
        class="w-full text-center p-1 rounded-md bg-green-500 border-2 border-green-500 my-3 hover:border-white hover:text-white"
      >
        Save Workout
      </button>
    </form>
  </div>
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
        statusMsg.value = "Workout added succesfully";
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
