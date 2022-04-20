import { boot } from 'quasar/wrappers'
import VueKonva from 'vue-konva';

export default boot(({ app }) => {
  // Set vue konva instance on app
  app.use(VueKonva, { prefix: 'k'});
})
