<template>
  <div class="workout-container">
    <!--Status Msg-->
    <div v-if="statusMsg || errorMsg">
      <p>{{ statusMsg }}</p>
      <p>{{ errorMsg }}</p>
    </div>
    <!--Add Wo-->
    <div class="form-container">
      <form>
        <h2>Add Workout</h2>
        <!-- Workout name -->
        <div class="workout-name-container">
          <label for="workout-name">Workout Name</label>
          <input type="text" required id="workout-name" v-model="workoutName" />
        </div>
        <div
          class="workout-record"
          v-for="(item, index) in exercises"
          :key="index"
        >
          <label for="excercise-name">Excercise</label>
          <input required type="text" v-model="item.excercise" />

          <label for="sets">Sets</label>
          <input required type="text" v-model="item.sets" />

          <label for="reps">Reps</label>
          <input required type="text" v-model="item.reps" />

          <label for="weight">Weight</label>
          <input required type="text" v-model="item.weight" />

          <label for="rest">Rest Time</label>
          <input required type="text" v-model="item.rest" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "create",
  components: {},
  setup() {
    const workoutName = ref("");
    const exercises = ref([1]);
    const statusMsg = ref(null);
    const errorMsg = ref(null);
    return { workoutName, exercises, statusMsg, errorMsg };
  },
};
</script>
