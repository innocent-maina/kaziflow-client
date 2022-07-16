import { shallowMount, createLocalVue } from "@vue/test-utils";
import BaseRadio from "@/components/BaseRadio.vue";

const localVue = createLocalVue();

let wrapper;
let propsData;

beforeEach(() => {
  propsData = {
    name: "label",
    disabled: false,
    value: "radio_value",
    inline: false,
  }

  wrapper = shallowMount(BaseRadio, {
    localVue,
    propsData: propsData
  });

});

describe("Testing Base Radio", () => {

  it("has input for base-radio", () => {
    const radio = wrapper.find("input");
    expect(radio.exists()).toBe(true);
  });

  it("has computed properties inlineClass that accoring inline props sets class", () => {
    expect(wrapper.vm.inlineClass).toBe("")
  });



});
