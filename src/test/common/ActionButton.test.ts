//TEST  CON testing-library
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import ActionButton from "../../components/common/ActionButton.vue";
import { fireEvent, render } from "@testing-library/vue";

describe("TooltipButton component", () => {
  const vuetify = createVuetify({
    components,
    directives,
  });
  it("renders tooltip render btn", async () => {
    const { getByText, getByRole, emitted } = render(ActionButton, {
      props: {
        icon: "mdi-heart",
        tooltip: "This is a tooltip",
      },
      global: {
        plugins: [vuetify],
      },
    });

    expect(getByText("This is a tooltip")).toBeInTheDocument();

    const button = getByRole("button");

    expect(button).toBeInTheDocument();

    await fireEvent.click(button);

    expect(emitted().click).toBeTruthy();
  });
});
