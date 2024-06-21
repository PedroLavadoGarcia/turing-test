//TEST  CON TEST-UTILS
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import TooltipEllipsis from "../../components/common/TooltipEllipsis.vue";
import { mount } from "@vue/test-utils";

describe("EllipsisText component", () => {
  const vuetify = createVuetify({
    components,
    directives,
  });
  const text = "This is a long text that should be truncated with ellipsis.";
  it("renders component", async () => {
    const wrapper = mount(TooltipEllipsis, {
      props: {
        text: text,
      },
      global: {
        plugins: [vuetify],
      },
    });
    await wrapper.vm.$nextTick();
    const container = wrapper.find(".table-container__ellipsis");
    expect(container).toBeTruthy();
  });
});
