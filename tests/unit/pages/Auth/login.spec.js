import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";

import Login from "@/pages/Auth/Login.vue";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
let wrapper;
let store;
let mockActions;
let router;

router = new VueRouter();

beforeEach(() => {
  mockActions = {
    login: jest.fn(),
    setInitiativeProductText: jest.fn(),
  };
  store = new Vuex.Store({
    actions: mockActions
  });
  wrapper = shallowMount(Login, {
    store,
    router,
    localVue,
    stubs: ["card", "base-input", "base-button", "base-spinner"]
  });
  wrapper.setData({
    form: {
      email: "test@gmail.com",
      password: "password"
    }
  });
});

describe("login screen unit test", () => {
  it("has email and password form fields", () => {
    const email = wrapper.find("#email");
    const password = wrapper.find("#password");
    expect(email.exists()).toBe(true);
    expect(password.exists()).toBe(true);
  });
  it("has login button defined", () => {
    const button = wrapper.find(".buttonLogin");
    expect(button.exists()).toBe(true);
    expect(button.text()).toContain("Login");
  });
  it("should store input values", () => {
    wrapper.find("#email").element.value = "test@gmail.com";
    wrapper.find("#email").trigger("input");
    wrapper.find("#password").element.value = "password";
    wrapper.find("#password").trigger("input");

    expect(wrapper.find("#password").element.value).toBe("password");
    expect(wrapper.find("#email").element.value).toBe("test@gmail.com");
  });
  it("call login function when login button is clicked", async () => {
    const loginMethod = jest.spyOn(wrapper.vm, "loginUser");
    await wrapper.find("form").trigger("submit.prevent");
    expect(loginMethod).toHaveBeenCalled();
    expect(mockActions.login).toHaveBeenCalled();
    expect(mockActions.login).toHaveBeenCalledWith(expect.any(Object), {
      email: "test@gmail.com",
      password: "password"
    });
  });

  it("should call startReg function when create account is clicked", async () => {
    const startReg = jest.spyOn(wrapper.vm, "startReg");
    const createAccountLink = wrapper.find("#start_reg");
    expect(createAccountLink.text()).toContain("Create new account");
    await createAccountLink.trigger("click");
    expect(startReg).toHaveBeenCalled();
  });

  it("should call forgotPassword function when forgot password link is clicked", async () => {
    const goToForgotPassword = jest.spyOn(wrapper.vm, "goToForgotPassword");
    const forgotPasswordLink = wrapper.find("#forgot_password");
    expect(forgotPasswordLink.text()).toContain("Forgot password");
    await forgotPasswordLink.trigger("click");
    expect(goToForgotPassword).toHaveBeenCalled();
  });
});
