import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";

import GeneralSection from "@/pages/InitiatorCreateRequest/GeneralSection.vue";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

let wrapper;
let store;
let mockActions;
let router;
let mockAddLocationField;
let mockAddRequestLocation;
let mockDeleteRequestLocation;
let mockSetPublishButtonStatus;

beforeEach(() => {
  mockActions = {
    clearRequestLocation: jest.fn(),
    populateRequestLocations: jest.fn(),
    setRequestGeneralSection: jest.fn(),
    change_active_section: jest.fn(),
    setRequestPublishButtonStatus: jest.fn(),
    addRequestLocationField: jest.fn(),
    add_request_location: jest.fn(),
    deleteRequestLocation: jest.fn(),
    remove_request_location: jest.fn()
  };

  router = new VueRouter({
    routes: []
  });

  store = new Vuex.Store({
    actions: mockActions,
    getters: {
      getRequestLocation: () => [],
      getRequestGeneralSection: () => [],
      getSingleRequestData: () => id => {
        return {
          request_location: [{}],
          request_title: "Request Title"
        };
      }
    }
  });

  mockAddLocationField = jest.spyOn(GeneralSection.methods, "addLocationField");
  mockAddRequestLocation = jest.spyOn(
    GeneralSection.methods,
    "addRequestLocation"
  );
  mockDeleteRequestLocation = jest.spyOn(
    GeneralSection.methods,
    "deleteRequestLocation"
  );
  mockSetPublishButtonStatus = jest.spyOn(
    GeneralSection.methods,
    "setRequestPublishButtonStatus"
  );

  wrapper = shallowMount(GeneralSection, {
    store,
    localVue,
    router,
    stubs: [
      "RequestLocation",
      "base-button",
      "base-input",
      "section-header",
      "section-footer"
    ],
    propsData: {
      isEdit: true,
      activeMe: true
    }
  });
});

describe("Create Request General Section", () => {
  it("(if isEdit) on mounted gets data from getter getSingleRequestData and dispatches actions", () => {
    expect(mockActions.clearRequestLocation).toHaveBeenCalled();
    expect(mockActions.populateRequestLocations).toHaveBeenCalled();
    expect(
      mockActions.setRequestGeneralSection
    ).toHaveBeenCalledWith(expect.any(Object), {
      request_title: "Request Title"
    });
  });

  it("has input for the title", () => {
    const title = wrapper.find("base-input-stub");
    expect(title.exists()).toBe(true);
  });

  it("calls setRequestPublishButtonStatus on blur on title", () => {
    wrapper.find("base-input-stub").vm.$emit("blur");
    expect(mockSetPublishButtonStatus).toHaveBeenCalled();
  });

  it("has RequestLocation component", () => {
    const request_location = wrapper.find("RequestLocation-stub");
    expect(request_location.exists()).toBe(true);
  });

  it("has RequestLocation component that emits addLocationField method", () => {
    wrapper.find("RequestLocation-stub").vm.$emit("addLocationField");
    expect(mockAddLocationField).toHaveBeenCalled();
    expect(mockActions.addRequestLocationField).toHaveBeenCalled();
  });

  it("has RequestLocation component that emits add_request_location method", () => {
    wrapper.find("RequestLocation-stub").vm.$emit("addLocation");
    expect(mockActions.add_request_location).toHaveBeenCalled();
  });

  it("has RequestLocation component that emits deleteRequestLocation method", () => {
    wrapper.find("RequestLocation-stub").vm.$emit("deleteLocation");
    expect(mockDeleteRequestLocation).toHaveBeenCalled();
    expect(mockActions.deleteRequestLocation).toHaveBeenCalled();
  });

});
