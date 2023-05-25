import { createApp, defineAsyncComponent } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.component(
  "BaseInput",
  defineAsyncComponent(() => import("@/components/Base/BaseInput.vue"))
);
app.use(createPinia());
app.use(router);

app.mount("#app");
