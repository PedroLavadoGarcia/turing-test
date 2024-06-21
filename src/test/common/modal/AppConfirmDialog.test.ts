//TEST  CON testing-library
import DialogComponent from "../../../components/common/modal/AppConfirmDialog.vue";
import "@testing-library/jest-dom";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { fireEvent, render } from "@testing-library/vue";

describe("DialogComponent", () => {
  const vuetify = createVuetify({
    components,
    directives,
  });
  it("se muestra correctamente cuando se activa", async () => {
    const { getByText } = render(DialogComponent, {
      props: {
        text: "Mensaje de prueba",
        value: true,
        textSecond: "Segundo mensaje de prueba",
      },
      global: {
        plugins: [vuetify],
      },
    });

    expect(getByText("Mensaje de prueba")).toBeInTheDocument();
    expect(getByText("Segundo mensaje de prueba")).toBeInTheDocument();

    await fireEvent.click(getByText("Confirm"));

    expect(getByText("Mensaje de prueba")).toBeInTheDocument();

    await fireEvent.click(getByText("Cancel"));

    expect(getByText("Mensaje de prueba")).toBeInTheDocument();
  });
});
