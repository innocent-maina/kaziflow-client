import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils";
import Vuex from "vuex";
import SaveTheRequest from "@/pages/InitiatorCreateRequest/SaveTheRequest.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

let store;
let stubs;

let setButtonsLabelSpy;
let mockActions;
let publishNowSpy;
let saveDraftSpy;
let wrapper;

beforeEach(() => {
  mockActions = {
    setRequestInformationSection: jest.fn(),
    populateLocations: jest.fn(),
    clearLocation: jest.fn(),
    getInitiator: jest.fn(),
    setRequestPublishButtonStatus: jest.fn(),
    setLoadingMode: jest.fn(),
    draftNewRequestData: jest.fn(),
    publishNewRequestData: jest.fn(),
    update_request: jest.fn(() =>
      Promise.resolve({ data: { status: "success", data: [{request_location: []}] } })
    ),
    create_new_request: jest.fn(() =>
      Promise.resolve({ data: { status: "success", data: {locations: []} } })
    )

  };

  store = new Vuex.Store({
    state: {
      authentication: {}
    },
    actions: mockActions,
    getters: {
      getIsRequestInputFilled: () => {
        return true
      },
      getNewRequestData: () => {
        return {
          start_date: "02-10-2022",
          end_date: "02-12-2022",
          initiative_title: "",
          initiative_subtitle: "",
          locations: [{
            local_name: ""
          }],
          initiative_title_image_url: "",
          initiative_summary_introduction: "",
          initiative_information: [{
            initiative_information_heading: "",
            initiative_information_text: ""
          }],
          discount_threshold: [],
          number_of_participants: ""
        };
      },
      getSingleInitiatorInitiativeData: () => {},
      getInitiatorId: () => 1,
    }
  });

  stubs = ["base-input", "base-button"];
  setButtonsLabelSpy = jest.spyOn(SaveTheRequest.methods, "setButtonsLabel");
  publishNowSpy = jest.spyOn(SaveTheRequest.methods, "publishNow");
  saveDraftSpy = jest.spyOn(SaveTheRequest.methods, "saveDraft");

  wrapper = shallowMount(SaveTheRequest, {
    store,
    localVue,
    stubs,
    propsData: {
      isEdit: false
    }
  });
});

describe("Save request elements", () => {
  it("has publish button", async () => {
    const publish = wrapper.findAll("base-button-stub").at(0);
    expect(publish.exists()).toBe(true);
  });

  it("has save draft button", async () => {
    const draft = wrapper.findAll("base-button-stub").at(1);
    expect(draft.exists()).toBe(true);
  });

  it("has a publish button", async () => {
    wrapper.findAll("base-button-stub").at(0).vm.$emit("click");
    expect(publishNowSpy).toHaveBeenCalled();
    await wrapper.vm.$nextTick();
    expect(mockActions.create_new_request).toHaveBeenCalled();
  });
})

describe("Save request functionalities", () => {
  it("saves new initiative draft", async () => {
    wrapper.findAll("base-button-stub").at(1).vm.$emit("click");
    expect(saveDraftSpy).toHaveBeenCalled();
    // actions
    expect(mockActions.setLoadingMode).toHaveBeenCalled();
    expect(mockActions.draftNewRequestData).toHaveBeenCalled();
    await wrapper.vm.$nextTick();
    expect(mockActions.create_new_request).toHaveBeenCalled();
  });

  it("publishes new initiative", async () => {
    wrapper.findAll("base-button-stub").at(0).vm.$emit("click");
    expect(publishNowSpy).toHaveBeenCalled();
    // actions
    expect(mockActions.setLoadingMode).toHaveBeenCalled();
    expect(mockActions.publishNewRequestData).toHaveBeenCalled();
    await wrapper.vm.$nextTick();
    expect(mockActions.create_new_request).toHaveBeenCalled();
  });

  it("edits initiative draft", async () => {
    wrapper = shallowMount(SaveTheRequest, {
      store,
      localVue,
      stubs,
      propsData: {
        isEdit: true
      },
    });

    wrapper.findAll("base-button-stub").at(1).vm.$emit("click");
    expect(saveDraftSpy).toHaveBeenCalled();
    await wrapper.vm.$nextTick();
    expect(mockActions.update_request).toHaveBeenCalled();
  });

  it("updates published initiative", async () => {
    wrapper = shallowMount(SaveTheRequest, {
      store,
      localVue,
      stubs,
      propsData: {
        isEdit: true
      },
    });

    wrapper.findAll("base-button-stub").at(0).vm.$emit("click");
    expect(publishNowSpy).toHaveBeenCalled();
    await wrapper.vm.$nextTick();
    expect(mockActions.update_request).toHaveBeenCalled();
  });
})

