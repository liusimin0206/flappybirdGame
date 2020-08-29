import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    counter: 0
  },
  mutations: {
    increment(state) {
      state.counter++;
    },
    reset(state) {
      state.counter = 0;
    }
  },
  getters: {
    counter10: state => {
      return Math.floor(state.counter / 10);
    }
  }
});
export default store;
