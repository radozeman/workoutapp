<template>
  <div class="container flex justify-center h-96 px-2">
    <div class="flex flex-col justify-center" v-if="statusMsg || errorMsg">
      <p class="text-green-500">{{ statusMsg }}</p>
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>
    <div class="flex max-w-2xl flex-col items-start" v-if="dataLoaded">
      <div
        class="flex w-full justify-center items-center mt-4 bg-gray-700 rounded-md px-4 pb-1"
        v-for="(item, index) in data.exercises"
        :key="index"
      >
        <div class="flex text-center text-white rounded-md">
          <label for="exercise-name"></label>
          <input
            id="exercise-name"
            v-if="edit"
            type="text"
            v-model="item.exercise"
          />
          <p v-else class="">{{ item.exercise }}</p>
        </div>
        <div class="flex flex-col text-center text-white rounded-md ml-4">
          <label for="sets">sets</label>
          <input id="sets" v-if="edit" type="text" v-model="item.sets" />
          <p v-else class="">{{ item.sets }}</p>
        </div>
        <div class="flex flex-col text-center text-white rounded-md mx-4">
          <label for="reps">reps</label>
          <input id="reps" v-if="edit" type="text" v-model="item.reps" />
          <p v-else class="">{{ item.reps }}</p>
        </div>
        <div class="flex flex-col text-center text-white rounded-md mr-4">
          <label for="weight">weight</label>
          <input id="weight" v-if="edit" type="text" v-model="item.weight" />
          <p v-else class="">{{ item.weight }}</p>
        </div>
        <div class="flex flex-col text-center text-white rounded-md">
          <label for="rest">rest</label>
          <input id="rest" v-if="edit" type="text" v-model="item.rest" />
          <p v-else class="">{{ item.rest }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { supabase } from "../supabase";
import { useRoute } from "vue-router";
import store from "../store/index";
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
    return {
      statusMsg,
      data,
      dataLoaded,
      errorMsg,
      edit,
      editMode,
      user,
      getData,
    };
  },
};
</script>
