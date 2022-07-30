import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";

import AddInitiative from "@/pages/InstallerInitiative/AddInitiative.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

let wrapper;
let store;
let mockActions;

beforeEach(() => {
  mockActions = {
    sendInstallerKey: jest.fn(Promise.resolve({ data: { status: "success" } })),
    postVerificationCode: jest.fn(() => (Promise.resolve({ data: { status: "success", data: {} } })))
    
  };

  store = new Vuex.Store({
    actions: mockActions,
    getters: {
      getInstallerInitiatives: () => []
    }
  });

  wrapper = shallowMount(AddInitiative, {
    store,
    localVue,
    stubs: ["base-button", "base-input", "card"]
  });

  wrapper.setData({
    form: {}
  });
});

describe("Installer Add Initiative", () => {
  it("has an input for verification code", () => {
    const input = wrapper.find("base-input-stub");
    expect(input.exists()).toBe(true);
  });

  it("has an button for adding the initiative", () => {
    const mockMethod = jest.spyOn(wrapper.vm, "addVerificationCode");
    const button = wrapper.find("base-button-stub");
    expect(button.exists()).toBe(true);
    button.vm.$emit("click");
    expect(mockMethod).toHaveBeenCalled();
    expect(mockActions.postVerificationCode).toHaveBeenCalled();
  });
});
