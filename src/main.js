import { createApp } from "vue";
import App from "./App.vue";
import { diagram } from "vue-diagram";

const app = createApp(App);

const requireComponent = require.context("./", true, /Base[A-Z]\w+\.(vue|js)$/);
requireComponent.keys().forEach(function(fileName) {
  let baseComponentConfig = requireComponent(fileName);
  baseComponentConfig = baseComponentConfig.default || baseComponentConfig;
  const baseComponentName =
    baseComponentConfig.name ||
    fileName.replace(/^.+\//, "").replace(/\.\w+$/, "");
  app.component(baseComponentName, baseComponentConfig);
});

app.mount("#app");

diagram(app);
