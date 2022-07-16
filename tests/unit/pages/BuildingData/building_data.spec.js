import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";

import BuildingData from "@/pages/BuildingData/BuildingData.vue";
import InitiatorParticipant from "@/pages/InitiatorParticipants/InitiatorParticipant.vue";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

let wrapper;
let store;
let mockActions;
let router;
jest.mock("../../../../utils/langTranslation.js");

beforeEach(() => {
  mockActions = {};

  router = new VueRouter({
    routes: [
      {
        path: "/initiatorparticipants",
        name: "initiatorparticipants",
        component: InitiatorParticipant
      }
    ]
  });

  store = new Vuex.Store({
    actions: mockActions,
    getters: {
      getSelectedParticipant: () => {
        return {
          photovoltaic_product: [{}]
        };
      }
    }
  });

  wrapper = shallowMount(BuildingData, {
    store,
    localVue,
    router,
    stubs: [
      "base-input",
      "base-button",
      "router-link",
      "base-spinner",
      "base-checkbox",
      "base-radio"
    ],
    computed: {
      getName() {
          return "Name"
      },
      lang() {
          return "en"
      },
      ownership() {
          return "Other"
      },
      numberOfFloors() {
          return "4"
      },
      lightningProtection() {
          return "Yes"
      },
      roofOrientation() {
          return "South"
      },
  }
  });

  wrapper.setData({
});

});

describe("Building Data", () => {
  it("has a section for general information", () => {
    const general_section = wrapper.findAll("section").at(0);
    expect(general_section.exists()).toBe(true);
  });

  it("has a section for building information", () => {
    const building_section = wrapper.findAll("section").at(1);
    expect(building_section.exists()).toBe(true);
  });

  it("has a section for additional information", () => {
    const additional_section = wrapper.findAll("section").at(2);
    expect(additional_section.exists()).toBe(true);
  });

  it("has a checkbox for verification", () => {
    const verification_checkbox = wrapper.find(".verification-checkbox");
    expect(verification_checkbox.exists()).toBe(true);
  });

  it("has 2 save buttons: save&submit and submit", () => {
    const save_buttons = wrapper.findAll("base-button-stub");
    expect(save_buttons.length).toBe(2);
  });
});