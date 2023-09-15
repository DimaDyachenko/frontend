import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

import { createVuetify } from "vuetify";
import { VDatePicker } from "vuetify/labs/VDatePicker";

export default createVuetify({
  theme: {
    defaultTheme: "dark",
  },
  components: {
    VDatePicker,
  },
});
