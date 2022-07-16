import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import DiscountThresholdSection from "@/pages/InitiatorCreateInitiative/InitiativeForm/DiscountThresholdSection.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

let store;
let stubs;
let mockActions;
let setThresholdSpy;
let setDiscountSpy;
let wrapper;
let props = {
  isGroupOffer: true,
  product: {
    product_discount: [{}]
  },
  initiative_template: {
    discount_threshold: [{}]
  },
  activeMe: true
};
let computed = {
  thresholds: () => [
    {
      unconditional_discount: false,
      number_of_leads: 5,
      customer_discount: "5"
    },
    {
      unconditional_discount: false,
      number_of_leads: 5,
      customer_discount: "5"
    }
  ],
  thresholdGoals: () => {
    return { min_max: "max", number_of_participants: 10 };
  }
};

beforeEach(() => {
  mockActions = {
    change_active_section: jest.fn(),
    setThresholdSection: jest.fn(),
    setThresholdSectionGoals: jest.fn(),
    deleteThreshold: jest.fn(),
    addThreshold: jest.fn(),
    setPublishButtonStatus: jest.fn(),
    setInitiativeType: jest.fn()
  };

  store = new Vuex.Store({
    state: {
      // authentication: { initiator_uuid: '' }
    },
    actions: mockActions,
    getters: {
      getThresholds: () => {
        return [{ unconditional_discount: true }];
      },
      getThresholdGoals: () => {
        return {};
      }
    }
  });

  stubs = [
    "base-input",
    "base-checkbox",
    "section-header",
    "section-footer",
    "base-spinner"
  ];

  setThresholdSpy = jest.spyOn(
    DiscountThresholdSection.methods,
    "setThreshold"
  );
  setDiscountSpy = jest.spyOn(DiscountThresholdSection.methods, "setDiscount");

  wrapper = shallowMount(DiscountThresholdSection, {
    store,
    localVue,
    stubs,
    propsData: props,
    computed: computed
  });
});
describe("Discount Threshold Section Form", () => {
  it("calls some methods on mounted", () => {
    expect(setDiscountSpy).toHaveBeenCalled();
    expect(setThresholdSpy).toHaveBeenCalled();
  });

  it("has thresholds for thresholds data", () => {
    const thresholds = wrapper.findAll(".threshold-section");
    expect(thresholds.exists()).toBe(true);
    expect(thresholds.length).toBe(2);
  });

  it("has delete threshold icon that calls deleteThreshold", async () => {
    const mockDeleteThreshold = jest.spyOn(wrapper.vm, "deleteThreshold");
    const delete_threshold = wrapper.findAll(".subsection-delete").at(0);
    delete_threshold.trigger("click");

    expect(mockDeleteThreshold).toHaveBeenCalled();
    await wrapper.vm.$nextTick();
    expect(mockActions.deleteThreshold).toHaveBeenCalled();
    expect(mockActions.setPublishButtonStatus).toHaveBeenCalled();
  });

  it("has threshold inputs", () => {
    const customer_discount = wrapper.findAll("base-input-stub").at(0);
    const options = wrapper.findAll("base-input-stub").at(1);
    const checkbox = wrapper.findAll("base-checkbox-stub").at(0);
    const number_of_leads = wrapper.findAll("base-input-stub").at(2); // when unconditional_discount=false

    expect(customer_discount.exists()).toBe(true);
    expect(options.exists()).toBe(true);
    expect(checkbox.exists()).toBe(true);
    expect(number_of_leads.exists()).toBe(true);
  });

  it("has add threshold button when unconditional_discount=false which calls addThreshold", async () => {
    const mockAddThreshold = jest.spyOn(wrapper.vm, "addThreshold");
    const button = wrapper.findAll("button").at(0);
    expect(button.exists()).toBe(true);
    button.trigger("click");
    expect(mockAddThreshold).toHaveBeenCalled();
    await wrapper.vm.$nextTick();
    expect(mockActions.addThreshold).toHaveBeenCalled();
    expect(mockActions.setPublishButtonStatus).toHaveBeenCalled();
  });

  it("has min max checkbox and goal data input", () => {
    const max_checkox = wrapper.findAll("base-checkbox-stub").at(1);
    const min_checkox = wrapper.findAll("base-checkbox-stub").at(2);
    const input = wrapper.findAll("base-input-stub").at(3);

    expect(max_checkox.exists()).toBe(true);
    expect(min_checkox.exists()).toBe(true);
    expect(input.exists()).toBe(true);
  });
});
