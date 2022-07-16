import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";

import InstallerRegistration from "@/pages/Auth/InstallerRegistration.vue";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
let wrapper;
let store;
let mockActions;
let router;
let passwordMatchSpy;

router = new VueRouter();

beforeEach(() => {
  mockActions = {
    registerInstaller: jest.fn(() =>
      Promise.resolve({ status: "success", data: {}, access_token: "access" })
    )
  };
  store = new Vuex.Store({
    actions: mockActions
  });

  passwordMatchSpy = jest.spyOn(InstallerRegistration.methods, "passwordMatch");

  wrapper = shallowMount(InstallerRegistration, {
    store,
    router,
    localVue,
    stubs: ["card", "base-input", "base-button", "base-checkbox"],
  });

  wrapper.setData({
    form: {
      installer_name: "test institute",
      email: "test@gmail.com",
      password: "password",
      confirm_password: "password",
      verification_code: "12345",
      customer_contact_email: "test@gmail.com",
      customer_contact_phone_number: "00123456789"
    },
  });
});

describe("Installer Registration screen unit test", () => {
  it("has installer name, email of contact person, password, confirm password, verification code, email of contact-person and phone number ofcustomer contact form fields", () => {
    const installer_name = wrapper.find("#installer_name");
    const email = wrapper.find("#email");
    const password = wrapper.find("#password");
    const confirm_password = wrapper.find("#confirm_password");
    const verification_code = wrapper.find("#verification_code");
    const customer_contact_phone_number = wrapper.find(
      "#customer_contact_phone_number"
    );

    expect(installer_name.exists()).toBe(true);
    expect(email.exists()).toBe(true);
    expect(password.exists()).toBe(true);
    expect(confirm_password.exists()).toBe(true);
    expect(verification_code.exists()).toBe(true);
    expect(customer_contact_phone_number.exists()).toBe(true);
  });
  it("has heading and boday par defined", () => {
    const heading_para = wrapper.find("#heading_para");
    const body_para = wrapper.find("#body_para");

    expect(heading_para.exists()).toBe(true);
    expect(body_para.exists()).toBe(true);

    expect(heading_para.text()).toContain("Terms and Conditions");
  });
  it("has create account button defined", () => {
    const button = wrapper.find("#submit_button");
    expect(button.exists()).toBe(true);
    expect(button.text()).toContain("Create account");
  });

  it("should store input values", () => {
    wrapper.find("#installer_name").element.value = "test institute";
    wrapper.find("#installer_name").trigger("input");
    wrapper.find("#email").element.value = "test@gmail.com";
    wrapper.find("#email").trigger("input");
    wrapper.find("#password").element.value = "password";
    wrapper.find("#password").trigger("input");
    wrapper.find("#confirm_password").element.value = "password";
    wrapper.find("#confirm_password").trigger("input");
    wrapper.find("#verification_code").element.value = "12345";
    wrapper.find("#verification_code").trigger("input");

    wrapper.find("#customer_contact_phone_number").element.value =
      "00123456789";
    wrapper.find("#customer_contact_phone_number").trigger("input");

    expect(wrapper.find("#installer_name").element.value).toBe(
      "test institute"
    );
    expect(wrapper.find("#email").element.value).toBe("test@gmail.com");
    expect(wrapper.find("#password").element.value).toBe("password");
    expect(wrapper.find("#confirm_password").element.value).toBe("password");
    expect(wrapper.find("#verification_code").element.value).toBe("12345");

    expect(wrapper.find("#customer_contact_phone_number").element.value).toBe(
      "00123456789"
    );
  });

  it("call createAccount function when Create Account button is clicked", async () => {
    const createAccountMethod = jest.spyOn(wrapper.vm, "createAccount");
    await wrapper.find("form").trigger("submit.prevent");
    expect(createAccountMethod).toHaveBeenCalled();
    expect(mockActions.registerInstaller).toHaveBeenCalled();
    expect(mockActions.registerInstaller).toHaveBeenCalledWith(
      expect.any(Object),
      {
        installer_name: "test institute",
        installer_email: "test@gmail.com",
        installer_password: "password",
        email_for_customer_contact: "test@gmail.com",
        phone_number_for_customer_contact: "00123456789",
        verification_code: "12345"
      }
    );
  });
});
