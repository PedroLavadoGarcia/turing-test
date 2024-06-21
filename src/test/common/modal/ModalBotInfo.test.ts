//TEST  CON testing-library
import ModalBotInfo from "../../../components/common/modal/ModalBotInfo.vue";
import "@testing-library/jest-dom";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { fireEvent, render } from "@testing-library/vue";

describe("YourComponent", () => {
  const vuetify = createVuetify({
    components,
    directives,
  });
  test("renders dialog with correct title when creating a new bot", async () => {
    const { getByText } = render(ModalBotInfo, {
      props: {
        value: true,
      },
      global: {
        plugins: [vuetify],
      },
    });

    expect(getByText("New Bot")).toBeInTheDocument();
  });

  test("updates fields and submits form correctly", async () => {
    const { getByLabelText, getByText } = render(ModalBotInfo, {
      props: {
        value: true,
      },
      global: {
        plugins: [vuetify],
      },
    });

    const nameField = getByLabelText("Name");
    const descriptionField = getByLabelText("Description");
    const personalityField = getByLabelText("Base Personality");
    const traitsSelect = getByLabelText("Personality Traits");
    const useSelect = getByLabelText("Case of Use");
    const stateSelect = getByLabelText("State");

    await fireEvent.update(nameField, "Test Bot");
    await fireEvent.update(descriptionField, "Test description");
    await fireEvent.update(personalityField, "Friendly");
    await fireEvent.update(traitsSelect, "Trait 1");
    await fireEvent.update(useSelect, "Use Case 1");
    await fireEvent.update(stateSelect, "Active");

    expect(getByText("Save")).toBeInTheDocument();
  });

  test("closes dialog when cancel button is clicked", async () => {
    const { getByText, emitted } = render(ModalBotInfo, {
      props: {
        value: true,
      },

      global: {
        plugins: [vuetify],
      },
    });

    fireEvent.click(getByText("Close"));

    expect(emitted().cancel).toBeTruthy();
  });
});
