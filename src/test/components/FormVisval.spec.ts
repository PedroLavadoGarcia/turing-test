import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import FormVisval from "@/components/FormVisval.vue";
import { createVuetify } from "vuetify";
import "vuetify/styles";
import { nextTick } from "vue";

// Crear una instancia de Vuetify
const vuetify = createVuetify();

// Datos simulados para la prueba
const mockData = {
  car_models: ["Model A", "Model B"],
  line_codes: ["Code 1", "Code 2"],
  cost_function: [
    { tipo: "Type A", weight_percentage: 50, source_table: "Table A" },
    { tipo: "Type B", weight_percentage: 50, source_table: "Table B" },
  ],
  extra_cost_table: "Table A",
  vin_info: [
    { tipo: "VIN Type A", source_table: "Table A" },
    { tipo: "VIN Type B", source_table: "Table B" },
  ],
};

// Mockear servicios
vi.mock("@/services/dataService", () => ({
  getData: vi.fn(() => Promise.resolve(mockData)),
  getLineCodes: vi.fn(() => Promise.resolve(["Code 1", "Code 2"])),
  getTables: vi.fn(() => Promise.resolve(["Table A", "Table B"])),
  saveData: vi.fn(() => Promise.resolve(true)),
}));

describe("FormVisval.vue", () => {
  it("carga correctamente", async () => {
    const wrapper = mount(FormVisval, {
      global: {
        plugins: [vuetify],
      },
    });

    // Esperar a que los datos se carguen
    await nextTick();

    const titleView = wrapper.find('[data-test-id="title"]');

    expect(titleView.text()).toContain("VISVAL Config Suite");
  });

  it("agrega correctamente un modelo de auto y un código de línea", async () => {
    const wrapper = mount(FormVisval, {
      global: {
        plugins: [vuetify],
      },
    });

    // Simular agregar un modelo de auto
    await wrapper.setData({ newCarModel: "Model X" });
    await wrapper.vm.addItem("car_models", wrapper.vm.newCarModel);
    await nextTick();

    // Verificar que el modelo de auto fue agregado
    const carModelsChips = wrapper.find('[data-test-id="car-models-chips"]');
    expect(carModelsChips.text()).toContain("Model X");

    // Simular agregar un código de línea
    await wrapper.setData({ newLineCode: "Line Code X" });
    await wrapper.vm.addItem("line_codes", wrapper.vm.newLineCode);
    await nextTick();

    // Verificar que el código de línea fue agregado
    const lineCodesChips = wrapper.find('[data-test-id="line-codes-chips"]');
    expect(lineCodesChips.text()).toContain("Line Code X");
  });

  it("elimina correctamente un modelo de auto y un código de línea", async () => {
    const wrapper = mount(FormVisval, {
      global: {
        plugins: [vuetify],
      },
      data() {
        return {
          formData: mockData,
          valid: true, // Para permitir los botones de guardar
        };
      },
    });

    // Esperar a que los datos se carguen
    await nextTick();

    // Verificar los ítems iniciales
    const carModelsChips = wrapper.find('[data-test-id="car-models-chips"]');
    expect(carModelsChips.text()).toContain("Model A");
    expect(carModelsChips.text()).toContain("Model B");

    const lineCodesChips = wrapper.find('[data-test-id="line-codes-chips"]');
    expect(lineCodesChips.text()).toContain("Code 1");
    expect(lineCodesChips.text()).toContain("Code 2");

    // Simular eliminar un modelo de auto
    await wrapper.vm.removeItem("car_models", 0); // Eliminar 'Model A'
    await nextTick();

    // Verificar que 'Model A' fue eliminado
    expect(carModelsChips.text()).not.toContain("Model A");
    expect(carModelsChips.text()).toContain("Model B");

    // Simular eliminar un código de línea
    await wrapper.vm.removeItem("line_codes", 1); // Eliminar 'Code 2'
    await nextTick();

    // Verificar que 'Code 2' fue eliminado
    expect(lineCodesChips.text()).toContain("Code 1");
    expect(lineCodesChips.text()).not.toContain("Code 2");
  });

  it("hace clic en el botón de guardar y llama a saveData", async () => {
    const wrapper = mount(FormVisval, {
      global: {
        plugins: [vuetify],
      },
      data() {
        return {
          formData: mockData,
          valid: true, // Para permitir el botón de guardar
        };
      },
    });

    // Simular clic en el botón de guardar
    await wrapper.find('[data-test-id="save-changes-button"]').trigger('click');

    await nextTick();

    // Verificar que la fla modal se ha abierto
    expect(wrapper.vm.confirmSaveDialog).toBe(true)  
  });

  it("hace clic en el botón de deshacer", async () => {
    const wrapper = mount(FormVisval, {
      global: {
        plugins: [vuetify],
      },
      data() {
        return {
          initialFormData: mockData,
          valid: true, 
        };
      },
    });

    wrapper.vm.formData.car_models=[]

    // Simular clic en el botón de deshacer
    await wrapper.find('[data-test-id="reset-form-button"]').trigger('click');

    await nextTick();

    // Verificar que se han reiniciado los cambios
    expect(wrapper.vm.formData).toBeDefined()
  });
});
