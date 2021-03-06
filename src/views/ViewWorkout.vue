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
      class="container flex justify-center flex-col px-6 pb-4 mx-auto sm:w-3/12"
    >
      <div class="flex justify-center mt-4 mb-4" v-if="statusMsg || errorMsg">
        <p class="text-green">{{ statusMsg }}</p>
        <p
          class="text-white text-center border-2 border-red mt-4 rounded-md px-6 pb-2 pt-1"
        >
          {{ errorMsg }}
        </p>
      </div>
      <transition
        appear
        enter-active-class="duration-100 ease-all"
        enter-from-class="transform opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="duration-200 ease-all"
        leave-from-class="opacity-100"
        leave-to-class="transform opacity-0"
      >
        <div class="flex flex-col items-start mt-8 sm:mt-4" v-if="dataLoaded">
          <div
            class="flex flex-wrap w-full justify-center items-center mb-8 sm:mb-4 bg-gray5 rounded-md pb-2 py-1 relative z-0"
            v-for="(item, index) in data.exercises"
            :key="index"
          >
            <div
              @click="
                editMode();
                updateWorkout();
              "
              class="w-8 h-8 bg-gray6 rounded-full flex justify-center items-center absolute top-2 left-4 sm:left-2 cursor-pointer"
            >
              <PencilIcon class="w-4 h-4 text-white hover:text-indigo" />
            </div>
            <div
              @click="
                deleteExercise(item.id);
                updateWorkout();
              "
              class="w-8 h-8 bg-gray6 rounded-full flex justify-center items-center absolute top-2 right-4 sm:right-2 cursor-pointer"
            >
              <TrashIcon class="w-4 h-4 text-white hover:text-indigo" />
            </div>
            <div class="flex basis-full justify-center items-center">
              <div
                class="flex text-center text-white uppercase rounded-md py-3 sm:py-1 mr-2"
              >
                <label class="text-center" for="exercise-name"></label>
                <input
                  placeholder="Exercise name"
                  class="text-base w-22 mb-2 text-center border-2 bg-gray3 border-gray3 rounded-md text-white focus:outline-none"
                  id="exercise-name"
                  v-if="edit"
                  type="text"
                  v-model="item.exercise"
                />
                <p v-else class="">{{ item.exercise }}</p>
              </div>
              <div class="flex text-white text-center">
                <label for="range"></label>
                <input
                  v-if="edit"
                  type="range"
                  v-model="item.intensity"
                  min="1"
                  max="5"
                  step="1"
                  class="appearance-none mb-4 outline-none h-1 rounded-sm bg-gradient-to-r from-green via-orange to-red"
                />
                <p v-else class="">| {{ item.intensity }}</p>
              </div>
            </div>
            <div class="flex justify-around w-80">
              <div class="flex text-center text-white rounded-md">
                <label v-show="!edit" for="sets" class="-mb-1">Sets</label>
                <input
                  required
                  placeholder="Sets"
                  class="ml-1 mr-2 text-base w-14 text-center border-2 bg-gray3 border-gray3 rounded-md text-white focus:outline-none"
                  id="sets"
                  v-if="edit"
                  type="text"
                  v-model="item.sets"
                />
                <p v-else>: {{ item.sets }}</p>
              </div>
              <div class="flex text-center text-white rounded-md">
                <label v-show="!edit" for="reps" class="-mb-1">Reps</label>
                <input
                  required
                  placeholder="Reps"
                  class="ml-1 mr-2 text-base w-14 text-center border-2 bg-gray3 border-gray3 rounded-md text-white focus:outline-none"
                  id="reps"
                  v-if="edit"
                  type="text"
                  v-model="item.reps"
                />
                <p v-else>: {{ item.reps }}</p>
              </div>
              <div class="flex text-center text-white rounded-md">
                <label v-show="!edit" for="weight" class="-mb-1">Weight</label>
                <input
                  placeholder="Weight"
                  class="ml-1 mr-2 text-base w-14 text-center border-2 bg-gray3 border-gray3 rounded-md text-white focus:outline-none"
                  id="weight"
                  v-if="edit"
                  type="text"
                  v-model="item.weight"
                />
                <p v-else>: {{ item.weight }}</p>
              </div>
              <div class="flex text-center text-white rounded-md">
                <label v-show="!edit" for="rest" class="-mb-1">Rest</label>
                <input
                  placeholder="Rest"
                  class="ml-1 text-base w-14 text-center border-2 bg-gray3 border-gray3 rounded-md text-white focus:outline-none"
                  id="rest"
                  v-if="edit"
                  type="text"
                  v-model="item.rest"
                />
                <p v-else>: {{ item.rest }}</p>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import { TrashIcon, PencilIcon } from "@heroicons/vue/outline";
import { ref, computed } from "vue";
import { supabase } from "../supabase";
import { useRoute } from "vue-router";
import store from "../store/index";
export default {
  name: "view-workout",
  components: { TrashIcon, PencilIcon },
  setup() {
    const data = ref(null);
    const dataLoaded = ref(null);
    const errorMsg = ref(null);
    const statusMsg = ref(null);
    const route = useRoute();
    const currentId = route.params.workoutId;
    const user = computed(() => store.state.user);
    const edit = ref(null);
    const editMode = () => {
      edit.value = !edit.value;
    };
    const getData = async () => {
      try {
        const { data: workouts, error } = await supabase
          .from("workouts")
          .select("*")
          .eq("id", currentId);
        if (error) throw error;
        data.value = workouts[0];
        dataLoaded.value = true;
      } catch (error) {
        errorMsg.value = error.message;
        setTimeout(() => {
          errorMsg.value = false;
        }, 4000);
      }
    };
    getData();
    const deleteExercise = (id) => {
      if (data.value.exercises.length > 1) {
        data.value.exercises = data.value.exercises.filter(
          (exercise) => exercise.id !== id
        );
        return;
      }
      errorMsg.value = "You must have at least 2 exercises";
      setTimeout(() => {
        errorMsg.value = false;
      }, 3000);
    };
    const updateWorkout = async () => {
      try {
        const { error } = await supabase
          .from("workouts")
          .update({
            exercises: data.value.exercises,
          })
          .eq("id", currentId);
        if (error) throw error;
      } catch (error) {
        errorMsg.value = `${error.message}`;
        setTimeout(() => {
          errorMsg.value = false;
        }, 3000);
      }
    };
    return {
      statusMsg,
      data,
      dataLoaded,
      errorMsg,
      edit,
      editMode,
      user,
      getData,
      deleteExercise,
      updateWorkout,
    };
  },
};
</script>
