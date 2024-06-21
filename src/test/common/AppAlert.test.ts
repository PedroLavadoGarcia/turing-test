//TEST  CON TEST-UTILS
import AppAlert from "../../components/common/AppAlert.vue";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { mount } from "@vue/test-utils";

describe("Alert component", () => {
  const vuetify = createVuetify({
    components,
    directives,
  });
  it("render to component", async () => {
    const wrapper = mount(AppAlert, {
      props: {
        show: true,
        type: "success",
        message: "¡Éxito!",
      },
      global: {
        plugins: [vuetify],
      },
    });

    expect(wrapper.exists()).toBe(true);

    wrapper.unmount();
  });
});
