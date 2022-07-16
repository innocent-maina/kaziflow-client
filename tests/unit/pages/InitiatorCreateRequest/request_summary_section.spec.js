import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";

import SummarySection from "@/pages/InitiatorCreateRequest/SummarySection.vue";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

let wrapper;
let store;
let mockActions;
let router;
let mockRegularCharCountUpdate;
let mockSetpublishButtonStatus;

beforeEach(() => {
  mockActions = {
    setRequestSummarySection: jest.fn(),
    setRequestPublishButtonStatus: jest.fn(),
    change_active_section: jest.fn()
  };

  router = new VueRouter({
    routes: []
  });

  store = new Vuex.Store({
    actions: mockActions,
    getters: {
      getRequestSummarySection: () => {
        return {
          request_summary_introduction: "Request Introduction"
        };
      },
      getSingleRequestData: () => id => {
        return {
          request_summary_introduction: "Request Introduction2"
        };
      }
    }
  });

  mockRegularCharCountUpdate = jest.spyOn(
    SummarySection.methods,
    "regularCharCountUpdate"
  );
  mockSetpublishButtonStatus = jest.spyOn(
    SummarySection.methods,
    "setRequestPublishButtonStatus"
  );

  wrapper = shallowMount(SummarySection, {
    store,
    localVue,
    router,
    stubs: ["base-button", "base-input", "section-header", "section-footer"],
    propsData: {
      isEdit: true,
      activeMe: true
    }
  });
});

describe("Create Request Summary Section", () => {
  it("(if isEdit) on mounted gets data from getter getSingleRequestData and dispatches setRequestSummarySection", () => {
    expect(mockActions.setRequestSummarySection).toHaveBeenCalled();
    expect(mockActions.setRequestSummarySection).toHaveBeenCalledWith(
      expect.any(Object),
      {
        request_summary_introduction: "Request Introduction2"
      }
    );
    expect(wrapper.vm.$data.regularCountRem).toEqual(
      800 - "Request Introduction2".length
    );
  });

  it("has textarea input for summary introduction", () => {
    const textarea = wrapper.findAll("textarea");
    expect(textarea.length).toBe(1);
  });

  it("calls regularCharCountUpdate on keyup textarea which updates regularCountRem based on input value", async () => {
    const highlightsInput = wrapper.find("textarea");
    await highlightsInput.trigger("keyup");
    expect(mockRegularCharCountUpdate).toHaveBeenCalled();
    expect(wrapper.vm.$data.regularCountRem).toEqual(
      800 - "Request Introduction".length
    );
  });

  it("calls setpublishButtonStatus on emitting textarea blur", async () => {
    const highlightsInput = wrapper.find("textarea");
    await highlightsInput.trigger("blur");
    expect(mockSetpublishButtonStatus).toHaveBeenCalled();
    expect(mockActions.setRequestPublishButtonStatus).toHaveBeenCalled();
  });

});
