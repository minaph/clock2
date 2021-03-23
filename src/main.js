import { createApp } from "vue";
import App from "./App.vue";

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
