import Vue from "vue";
import App from "./App.vue";
import "./assets/style/reset.css";
import "./assets/style/global.css";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
