import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import BaseButton from "@/components/BaseButton.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

let stubs;
let wrapper;
let propsData;
let mockHandleClick;

beforeEach(() => {
  propsData = {
    tag: "button",
    round: false,
    icon: false,
    block: false,
    loading: false,
    disabled: false,
    type: "default",
    nativeType: "button",
    size: "",
    simple: false,
    link: false,
  }

  stubs = ["component"];

  mockHandleClick = jest.spyOn(BaseButton.methods, "handleClick")

  wrapper = shallowMount(BaseButton, {
    localVue,
    stubs: stubs,
    propsData: propsData
  });

});

describe("Testing Base Button", () => {

  it("has component for base-button", () => {
    const component = wrapper.find(".btn");
    expect(component.exists()).toBe(true);
  });

  it("has emits click by handleClick method when clicked", () => {
    wrapper.find(".btn").trigger('click')
    expect(mockHandleClick).toHaveBeenCalled();
    expect(wrapper.emitted('click')).toBeTruthy()
  });

});
