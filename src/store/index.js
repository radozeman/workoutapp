import { reactive } from "vue";
// import { createStore } from 'vuex'

const state = reactive({
  user: null,
});

const methods = {
  setUser(payload) {
    state.user = payload ? payload.user : null;
  },
};

export default {
  state,
  methods,
};

// export default createStore({
//   state: {
//   },
//   getters: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })
