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
        <p
          v-show="!errorMsg"
          class="text-white text-center border-2 border-green mt-4 rounded-md px-6 pb-2 pt-1"
        >
          {{ statusMsg }}
        </p>
        <p
          v-show="!statusMsg"
          class="text-white text-center border-2 border-red mt-4 rounded-md px-6 pb-2 pt-1"
        >
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
          type="date"
          required
          class="text-base text-center w-50 mb-4 border-2 border-gray3 bg-gray3 rounded-md text-white pl-1 focus:outline-none"
          id="workout-date"
          v-model="workoutDate"
        />
        <div
          class="mb-3 relative"
          v-for="(item, index) in exercises"
          :key="index"
        >
          <div
            @click="deleteExercise(item.id)"
            class="absolute -right-6 bottom-[7rem]"
          >
            <TrashIcon
              class="text-white cursor-pointer hover:text-indigo w-5 h-5"
            />
          </div>
          <div class="flex flex-col text-center items-center rounded-t-md">
            <label for="exercise-name">Exercise</label>
            <input
              required
              type="text"
              class="text-base text-center border-2 bg-gray3 border-gray3 rounded-md text-white pl-1 focus:outline-none"
              v-model="item.exercise"
            />
          </div>
          <div class="flex flex-wrap flex-col justify-center rounded-b-md mt-1">
            <div class="flex">
              <div class="flex flex-col items-center mb-4">
                <label for="sets">Sets</label>
                <input
                  required
                  class="text-base w-14 text-center border-2 bg-gray3 border-gray3 rounded-md text-white focus:outline-none"
                  type="number"
                  v-model="item.sets"
                />
              </div>
              <div class="flex flex-col items-center mx-1">
                <label for="reps">Reps</label>
                <input
                  required
                  class="text-base w-14 text-center border-2 bg-gray3 border-gray3 rounded-md text-white focus:outline-none"
                  type="number"
                  v-model="item.reps"
                />
              </div>
              <div class="flex flex-col items-center mr-1">
                <label for="weight">Weight</label>
                <input
                  required
                  class="text-base w-14 text-center border-2 bg-gray3 border-gray3 rounded-md text-white focus:outline-none"
                  type="number"
                  v-model="item.weight"
                />
              </div>
              <div class="flex flex-col items-center">
                <label for="rest">Rest</label>
                <input
                  required
                  class="text-base w-14 text-center border-2 bg-gray3 border-gray3 rounded-md text-white focus:outline-none"
                  type="number"
                  v-model="item.rest"
                />
              </div>
            </div>
            <div class="flex flex-col items-center">
              <label for="range" class="mb-4 text-center">
                Intensity : {{ item.intensity }}
              </label>
              <input
                v-model="item.intensity"
                type="range"
                min="1"
                max="5"
                step="1"
                class="w-52 appearance-none mb-4 outline-none h-1 rounded-sm bg-gradient-to-r from-green via-orange to-red"
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
          class="w-52 text-center p-1 rounded-md bg-indigo border-2 border-indigo my-3 hover:text-white"
        >
          Save Workout
        </button>
      </form>
    </div>
  </transition>
</template>

<script>
import { TrashIcon } from "@heroicons/vue/outline";
import { supabase } from "../supabase";
import { ref } from "vue";
import { uid } from "uid";
import { useRouter } from "vue-router";
export default {
  name: "create",
  components: { TrashIcon },
  setup() {
    const router = useRouter();
    const workoutDate = ref("");
    const workoutName = ref("");
    const exercises = ref([]);
    const statusMsg = ref(null);
    const errorMsg = ref(null);
    const intensity = ref("");

    const addExercise = () => {
      exercises.value.push({
        id: uid(),
        exercise: "",
        sets: "",
        reps: "",
        weight: "",
        intensity: "",
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
      errorMsg.value = "No exercises to delete";
      setTimeout(() => {
        errorMsg.value = false;
      }, 3000);
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
        router.push({ name: "Home" });
        setTimeout(() => {
          statusMsg.value = false;
        }, 3000);
      } catch (error) {
        errorMsg.value = `${error.message}`;
        setTimeout(() => {
          errorMsg.value = false;
        }, 3000);
      }
    };
    return {
      intensity,
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
