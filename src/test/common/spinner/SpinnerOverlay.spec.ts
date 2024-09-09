import { render } from "@testing-library/vue";
import SpinnerDialog from "@/components/common/spinner/SpinnerOverlay.vue";
import { describe, it, expect } from "vitest";
import { createVuetify } from "vuetify";
import "vuetify/styles";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

describe("SpinnerDialog.vue", () => {
  const vuetify = createVuetify({ components, directives });

  const renderComponent = (propsData: any) => {
    return render(SpinnerDialog, {
      global: {
        plugins: [vuetify],
      },
      props: propsData,
    });
  };

  it("renders the spinner dialog and checks elements with data-test-id", () => {
    const { queryByTestId } = renderComponent({ modelValue: true });

    // Verifica que el diálogo se muestra correctamente
    const dialog = queryByTestId("spinner-dialog");
    expect(dialog).not.toBeNull();

    // Verifica la tarjeta del spinner
    const card = queryByTestId("spinner-card");
    expect(card).not.toBeNull();

    // Verifica el título de la tarjeta
    const title = queryByTestId("spinner-title");
    expect(title).not.toBeNull();

    // Verifica el spinner
    const spinner = queryByTestId("spinner-progress");
    expect(spinner).not.toBeNull();
  });
});
