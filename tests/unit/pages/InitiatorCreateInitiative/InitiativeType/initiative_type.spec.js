import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import InitiativeType from "@/pages/InitiatorCreateInitiative/InitiativeType/InitiativeType.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

let store;
let stubs;
let mockActions;
let wrapper;
let deleteInitiativeLocationSpy;
let addInitiativeLocationSpy;
let addLocationFieldSpy;
let showPartnerOptionSpy;

beforeEach(() => {
  mockActions = {
    setInitiativePartner: jest.fn(),
    addLocationField: jest.fn(),
    add_initiative_location: jest.fn(),
    deleteLocation: jest.fn(),
    setLoadingMode: jest.fn(),
  };

  store = new Vuex.Store({
    actions: mockActions,
    getters: {
      getLocation: () => [{}],
      getProductText: () => "",
      getPartnerLocation: () => {
        return { partner_info: "" };
      }
    }
  });

  stubs = ["InitiativeLocation", "base-button", "router-link", "base-spinner"];

  deleteInitiativeLocationSpy = jest.spyOn(
    InitiativeType.methods,
    "deleteInitiativeLocation"
  );
  addInitiativeLocationSpy = jest.spyOn(
    InitiativeType.methods,
    "addInitiativeLocation"
  );
  addLocationFieldSpy = jest.spyOn(InitiativeType.methods, "addLocationField");
  showPartnerOptionSpy = jest.spyOn(InitiativeType.methods, "showPartnerOption");

  wrapper = shallowMount(InitiativeType, {
    store,
    localVue,
    stubs,
    data() {
      return {
        routerLink: "/initiatorinitiativeform",
        selectedItem: "select",
        locationSelected: true
      };
    }
  });
});

describe("Initiative Type", () => {
  it("has Location input", () => {
    const initiativeLocation = wrapper.find("InitiativeLocation-stub");
    expect(initiativeLocation.exists()).toBe(true);
  });

  it("calls addLocationField on Location input", async () => {
    wrapper.find("InitiativeLocation-stub").vm.$emit("addLocationField");
    await wrapper.vm.$nextTick();
    expect(addLocationFieldSpy).toHaveBeenCalled();
  });

  it("calls addInitiativeLocation on Location input", async () => {
    wrapper.find("InitiativeLocation-stub").vm.$emit("addLocation");
    await wrapper.vm.$nextTick();
    expect(addInitiativeLocationSpy).toHaveBeenCalled();
  });

  it("calls deleteInitiativeLocation on Location input", async () => {
    wrapper.find("InitiativeLocation-stub").vm.$emit("deleteLocation");
    await wrapper.vm.$nextTick();
    expect(deleteInitiativeLocationSpy).toHaveBeenCalled();
  });

  it("calls partnerAvailability on Location input", async () => {
    wrapper.find("InitiativeLocation-stub").vm.$emit("partnerAvailability");
    await wrapper.vm.$nextTick();
    expect(showPartnerOptionSpy).toHaveBeenCalled();
  });

  it("has continue button that calls continueTo and respective actions", () => {
    let mockContinueTo = jest.spyOn(wrapper.vm, "continueTo");
    let continueButton = wrapper.find("base-button-stub");
    continueButton.vm.$emit("click");
    expect(mockContinueTo).toHaveBeenCalled();
    expect(mockActions.setInitiativePartner).toHaveBeenCalled();
  });

  it("has cancel button inside router link", () => {
    let routerLink = wrapper.findAll("router-link-stub").at(0);
    expect(routerLink.exists()).toBe(true);
    expect(routerLink.attributes().to).toBe('/initiatorinitiatives');
  });
});
