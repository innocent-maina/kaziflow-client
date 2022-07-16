import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import SaveTheInitiative from "@/pages/InitiatorCreateInitiative/InitiativeForm/SaveTheInitiative.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

let store;
let stubs;
let mockActions;
let getNewInitiativeDataSpy;
let checkValidationSpy;
let publishNowSpy;
let saveDraftSpy;
let wrapper;
let props = {
  is_draft: false,
  isInputFilled: false,
  isEdit: false,
  isCurrentGroupOffer: false,
  isGroupOffer: false,
  isScheduled: false,
  installers: [],
  selectedInitiativeId: 1,
  publishButtonLabel: "",
  draftButtonLabel: ""
};

beforeEach(() => {
  mockActions = {
    publishNewInitiativeData: jest.fn(),
    update_initiative: jest.fn(),
    create_new_initiative: jest.fn(() =>
      Promise.resolve({ data: { status: "success", data: {} } })
    ),
    draftNewInitiativeData: jest.fn(),
    sendInstallerKey: jest.fn(),
    setLoadingMode: jest.fn(),
    setPublishClicked: jest.fn(),
    setActiveSection: jest.fn()
  };

  store = new Vuex.Store({
    actions: mockActions,
    getters: {
      getNewInitiativeData: () => {
        return {
          start_date: "02-10-2022",
          end_date: "02-12-2022",
          initiative_title: "",
          initiative_subtitle: "",
          locations: [{ local_name: "" }],
          initiative_title_image_url: "",
          initiative_summary_introduction: "",
          initiative_information: [
            {
              initiative_information_heading: "",
              initiative_information_text: ""
            }
          ],
          discount_threshold: [],
          number_of_participants: ""
        };
      },
      getSingleInitiatorInitiativeData: () => {},
      getInitiatorId: () => 1,
      getPartner: () => "",
      getPartnerSelections: () => ""
    }
  });

  stubs = ["base-input", "base-button"];
  getNewInitiativeDataSpy = jest.spyOn(
    SaveTheInitiative.methods,
    "getNewInitiativeData"
  );
  checkValidationSpy = jest.spyOn(SaveTheInitiative.methods, "checkValidation");
  publishNowSpy = jest.spyOn(SaveTheInitiative.methods, "publishNow");
  saveDraftSpy = jest.spyOn(SaveTheInitiative.methods, "saveDraft");

  wrapper = shallowMount(SaveTheInitiative, {
    store,
    localVue,
    stubs,
    propsData: props,
    data() {
      return {
        requiredFieldsMessage: ""
      };
    }
  });
});
describe("Discount Threshold Section Form", () => {
  it("has publish button", async () => {
    const publish = wrapper.findAll("base-button-stub").at(0);
    expect(publish.exists()).toBe(true);
  });

  it("does not publish if fields are not validated", async () => {
    wrapper.findAll("base-button-stub").at(0).vm.$emit("click");
    expect(publishNowSpy).toHaveBeenCalled();
    // actions
    expect(mockActions.setLoadingMode).toHaveBeenCalled();
    expect(mockActions.publishNewInitiativeData).toHaveBeenCalled();
    await wrapper.vm.$nextTick();
    expect(getNewInitiativeDataSpy).toHaveBeenCalled();
    await wrapper.vm.$nextTick();
    expect(checkValidationSpy).toHaveBeenCalled();
    expect(mockActions.setPublishClicked).toHaveBeenCalled();
  });

  it("publishes new initiative if fields are validated", async () => {
    store = new Vuex.Store({
      actions: mockActions,
      getters: {
        getNewInitiativeData: () => {
          return {
            start_date: "02-10-2022",
            end_date: "02-12-2022",
            initiative_title: "Title",
            initiative_subtitle: "Subtitle",
            locations: [{ local_name: "local_name" }],
            initiative_title_image_url: "title_image",
            initiative_summary_introduction: "Summary",
            initiative_information: [
              {
                initiative_information_heading: "Heading",
                initiative_information_text: "Text"
              }
            ],
            discount_threshold: [{ customer_discount: "29%" }],
            number_of_participants: "22"
          };
        },
        getSingleInitiatorInitiativeData: () => {},
        getInitiatorId: () => 1,
        getPartner: () => "",
        getPartnerSelections: () => ""
      }
    });

    wrapper = shallowMount(SaveTheInitiative, {
      store,
      localVue,
      stubs,
      propsData: props
    });

    wrapper.findAll("base-button-stub").at(0).vm.$emit("click");

    expect(publishNowSpy).toHaveBeenCalled();
    await wrapper.vm.$nextTick();
    expect(mockActions.create_new_initiative).toHaveBeenCalled();
  });

  it("has save draft button", async () => {
    const draft = wrapper.findAll("base-button-stub").at(1);
    expect(draft.exists()).toBe(true);
  });

  it("saves new initiative draft", async () => {
    wrapper.findAll("base-button-stub").at(1).vm.$emit("click");
    expect(saveDraftSpy).toHaveBeenCalled();
    // actions
    expect(mockActions.setLoadingMode).toHaveBeenCalled();
    expect(mockActions.draftNewInitiativeData).toHaveBeenCalled();
    await wrapper.vm.$nextTick();
    expect(getNewInitiativeDataSpy).toHaveBeenCalled();
    await wrapper.vm.$nextTick();
    expect(mockActions.create_new_initiative).toHaveBeenCalled();
  });
});
