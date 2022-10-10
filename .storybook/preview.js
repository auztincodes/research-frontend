import Vuex from 'vuex';
import Vue from 'vue';
import store from '../src/store';

Vue.use(Vuex);
Vue.prototype.$store = store;
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}