import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleRight,
  faArrowUp,
  faChevronRight,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "./registerServiceWorker";
import Vue from "vue";
import Buefy from "buefy";
import "buefy/dist/buefy.css";

library.add(faAngleRight, faChevronRight, faArrowUp, faQuestionCircle);

Vue.config.productionTip = false;
Vue.use(Buefy, { defaultIconPack: "fa" });
Vue.component("font-awesome-icon", FontAwesomeIcon);

import("./mop_bindings").then((mop) => {
  window.mop = mop;
  const vue = new Vue({
    components: {
      App: () => import("./App.vue"),
    },
    el: "#app",
    render: (h) => h("App"),
  });
  return vue;
});
