import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import InstallerProfileForm from "@/pages/InstallerProfile/InstallerProfileForm.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

let store;
let stubs;
let mockActions;
let wrapper;
let setLogoImageSpy;
let formData = {
  installer_name: "name",
  installer_website: "website",
  installer_official_email: "official",
  installer_official_phonenumber: "00",
  installer_description: "description",
  installer_email: "email",
  installer_logo_url: "logo"
};

beforeEach(() => {
  mockActions = {
    getInstaller: jest.fn(() => Promise.resolve([formData])),
    updateInstaller: jest.fn(),
    setLoadingMode: jest.fn(),
    deactiveRemindMeLater: jest.fn()
  };

  store = new Vuex.Store({
    state: {
      authentication: { initiator_uuid: "" }
    },
    actions: mockActions
  });

  stubs = [
    "card",
    "base-input",
    "base-button",
    "base-spinner",
    "base-image-uploader"
  ];

  setLogoImageSpy = jest.spyOn(InstallerProfileForm.methods, "setLogoImage");

  wrapper = shallowMount(InstallerProfileForm, {
    store,
    localVue,
    stubs
  });

  wrapper.setData({
    form: formData,
    installer_uuid: ""
  });
});

describe("Installer Profile Form Fields", () => {
  it("calls getInstaller action on mount", async () => {
    expect(mockActions.getInstaller).toHaveBeenCalled();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.form).toEqual(formData);
  });

  it("has input fields", () => {
    const nameInput = wrapper.findAll("base-input-stub").at(0);
    const websiteInput = wrapper.findAll("base-input-stub").at(1);
    const emailInput = wrapper.findAll("base-input-stub").at(2);
    const phonenumberInput = wrapper.findAll("base-input-stub").at(3);
    const descriptionInput = wrapper.findAll("base-input-stub").at(4);

    expect(nameInput.exists()).toBe(true);
    expect(websiteInput.exists()).toBe(true);
    expect(emailInput.exists()).toBe(true);
    expect(phonenumberInput.exists()).toBe(true);
    expect(descriptionInput.exists()).toBe(true);
  });

  it("has logo image uploader", () => {
    const logoUploader = wrapper.findAll("base-image-uploader-stub").at(0);
    expect(logoUploader.exists()).toBe(true);
  });

  it("calls setLogoImage for logo uploader", async () => {
    const logoUploader = wrapper.findAll("base-image-uploader-stub").at(0);
    logoUploader.vm.$emit("setImage");
    await wrapper.vm.$nextTick();
    expect(setLogoImageSpy).toHaveBeenCalled();
  });

  it("click on the save button calls updateInstaller function", () => {
    let mockMethod = jest.spyOn(wrapper.vm, "updateInstaller");
    wrapper.find(".update-installer").vm.$emit("click"); // for stubs use this, for usual buttons use .trigger('click') instead

    expect(mockMethod).toHaveBeenCalled();
    expect(mockActions.updateInstaller).toHaveBeenCalled();
    expect(mockActions.updateInstaller).toHaveBeenCalledWith(
      expect.any(Object),
      wrapper.vm.$data.form
    );
  });
});
