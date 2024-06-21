import "@testing-library/jest-dom";
import BotList from "../../components/bot-list/BotList.vue";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import ActionButton from "../../components/common/ActionButton.vue";
import AppAlert from "../../components/common/AppAlert.vue";
import TooltipEllipsis from "../../components/common/TooltipEllipsis.vue";
import AppConfirmDialog from "../../components/common/modal/AppConfirmDialog.vue";
import ModalBotInfo from "../../components/common/modal/ModalBotInfo.vue";
import { mount } from "@vue/test-utils";

// Crea una instancia de Vuetify
const vuetify = createVuetify({
  components,
  directives,
});

describe("BotList Component", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(BotList, {
      global: {
        plugins: [vuetify],
        components: {
          "modal-bot-info": ModalBotInfo,
          "app-confirm-dialog": AppConfirmDialog,
          "app-alert": AppAlert,
          "tooltip-ellipsis": TooltipEllipsis,
          "action-button": ActionButton,
        },
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should close dialog on saveDialog method call", async () => {
    const mockItem = {
      id: "1",
      name: "Test Bot",
      description: "Test Description",
    };
    wrapper.vm.saveDialog(mockItem);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.dialogDetail).toBe(false);
  });

  it("should close dialog on createDialog method call", async () => {
    const mockItem = {
      id: "1",
      name: "New Bot",
      description: "New Bot Description",
    };
    wrapper.vm.createDialog(mockItem);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.dialogDetail).toBe(false);
  });

  it("should set dialogConfirm to true on deleteDialog method call", async () => {
    const mockItem = {
      id: "1",
      name: "Test Bot",
      description: "Test Description",
    };
    wrapper.vm.deleteDialog(mockItem);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.dialogConfirm).toBe(true);
  });

  it("should show alert on showAlert method call", async () => {
    const message = "Test alert message";
    const type = "success";
    wrapper.vm.showAlert(message, type);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.alert.show).toBe(true);
    expect(wrapper.vm.alert.message).toBe(message);
    expect(wrapper.vm.alert.type).toBe(type);
  });

  it("should dismiss alert on dismissAlert method call", async () => {
    wrapper.vm.alert.show = true;
    wrapper.vm.alert.message = "Test alert message";
    wrapper.vm.alert.type = "success";

    wrapper.vm.dismissAlert();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.alert.show).toBe(false);
    expect(wrapper.vm.alert.message).toBe("");
    expect(wrapper.vm.alert.type).toBe("info");
  });

  it("should show alert on saveChat method call", async () => {
    const mockItem = {
      id: "1",
      name: "Test Bot",
      description: "Test Description",
    };
    wrapper.vm.alert.show = false;
    wrapper.vm.saveChat(mockItem);
    expect(wrapper.vm.alert.show).toBe(true);
  });

  it("should show alert on deleteChat method call", async () => {
    const mockItem = {
      id: "1",
      name: "Test Bot",
      description: "Test Description",
    };
    wrapper.vm.alert.show = false;
    wrapper.vm.deleteChat(mockItem);
    expect(wrapper.vm.alert.show).toBe(true);
  });

  it("should show alert on createChat method call", async () => {
    const mockItem = {
      id: "1",
      name: "Test Bot",
      description: "Test Description",
    };
    wrapper.vm.alert.show = false;
    wrapper.vm.createChat(mockItem);
    expect(wrapper.vm.alert.show).toBe(true);
  });

  it("should open dialog on openDetail method call", async () => {
    wrapper.vm.openDetail();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.dialogDetail).toBe(true);
  });
});
