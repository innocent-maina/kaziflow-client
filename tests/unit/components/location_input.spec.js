import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import LocationInput from "@/components/LocationInput.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

let store;
let stubs;
let mockActions;
let wrapper;
let propsData;
let mockGetLocationDetails
let mockSearchLocation
let mockExtractLocationData

let locRes = [{
  display_name: 'Berlin',
  osm_id: '70',
  type: 'postal_code'
}]

beforeEach(() => {
  mockActions = {
    change_active_section: jest.fn(),
    addLocation: jest.fn(),
    deleteLocation: jest.fn(),
    add_initiative_location: jest.fn(),
    getSearchedLocation: jest.fn(() => Promise.resolve(locRes)),
    getLocationDetails: jest.fn(() => Promise.resolve({
      centroid: {coordinates: [25, 41]}
    })),
    getCoordinateDetails: jest.fn(() => Promise.resolve({address:[], linked_places: []})),
  };

  store = new Vuex.Store({
    actions: mockActions,
    getters: {
      getPartnerLocation: () => [{}],
      getPublishClicked: () => true
    }
  });

  propsData = {
    getLocations: [
      {
        location_id: 0,
        local_name: "",
        admin_level_3: "",
        admin_level_4: "",
        admin_level_5: "",
        admin_level_6: "",
        admin_level_7: "",
        admin_level_8: "",
        admin_level_9: "",
        admin_level_10: "",
        admin_level_11: "",
        postcode: ""
      },
      {
        location_id: 0,
        local_name: "",
        admin_level_3: "",
        admin_level_4: "",
        admin_level_5: "",
        admin_level_6: "",
        admin_level_7: "",
        admin_level_8: "",
        admin_level_9: "",
        admin_level_10: "",
        admin_level_11: "",
        postcode: ""
      },
    ],
    onBlur() {return ''}
  }

  stubs = ["base-input", "base-button"];

  mockGetLocationDetails = jest.spyOn(LocationInput.methods, "getLocationDetails")
  mockSearchLocation = jest.spyOn(LocationInput.methods, "searchLocation")
  mockExtractLocationData = jest.spyOn(LocationInput.methods, "extract_location_data")

  wrapper = shallowMount(LocationInput, {
    store,
    localVue,
    stubs,
    propsData: propsData,
    data() {
      return {locationSearchResults: locRes}
    }
  });
});

describe("Testing Location Section Form", () => {
  it("has an input field", () => {
    const locationInput = wrapper.find("base-input-stub");
    expect(locationInput.exists()).toBe(true);
  });

  it("calls searchLocation on input", async() => {
    wrapper.find("base-input-stub").vm.$emit('input');
    expect(mockSearchLocation).toHaveBeenCalled();

    // expect(mockActions.getSearchedLocation).toHaveBeenCalled()
  });

  it("calls getLocationDetails which adds location on location-result click", async() => {
    wrapper.findAll(".location-result").at(0).trigger('click');
    await wrapper.vm.$nextTick();

    expect(mockGetLocationDetails).toHaveBeenCalled();
    expect(mockGetLocationDetails)
      .toHaveBeenCalledWith(locRes[0].display_name, locRes[0].osm_id, locRes[0].type);

    await wrapper.vm.$nextTick();
    expect(mockActions.getLocationDetails).toHaveBeenCalled();
    await wrapper.vm.$nextTick();
    expect(mockActions.getSearchedLocation).toHaveBeenCalled();
    await wrapper.vm.$nextTick();
    expect(mockActions.getCoordinateDetails).toHaveBeenCalled();

    await wrapper.vm.$nextTick();
    expect(mockExtractLocationData).toHaveBeenCalled();
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('addLocation')).toBeTruthy();
  });

  it("calls addLocationField function on Add Location button", () => {
    const addLocationCalled = jest.spyOn(wrapper.vm, "addLocationField");
    wrapper.find(".btn-primary").vm.$emit("click");

    expect(addLocationCalled).toHaveBeenCalled();
    expect(wrapper.emitted("addLocationField")).toBeTruthy();
  });

  it("calls deleteLocation function on Delete Location button", () => {
    wrapper.findAll(".input-container");
    const deleteLocation = jest.spyOn(wrapper.vm, "deleteLocation");
    wrapper.findAll(".delete").at(0).trigger("click");

    expect(deleteLocation).toHaveBeenCalled();
    expect(wrapper.emitted("deleteLocation")).toBeTruthy();
  });
});
