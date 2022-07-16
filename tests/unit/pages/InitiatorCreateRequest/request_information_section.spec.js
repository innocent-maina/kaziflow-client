import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";

import InformationSection from "@/pages/InitiatorCreateRequest/InformationSection.vue";
import Notify from "@/components/NotificationPlugin/Notification.vue";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
localVue.use(Notify);

let wrapper;
let store;
let mockActions;
let router;


beforeEach(() => {
  mockActions = {
    setSrc: jest.fn(),
    getSignedURL: jest.fn(),
    convertImagetoBlob: jest.fn(),
    uploadImage: jest.fn(),
    setRequestInformationSection: jest.fn(),
    // setRequestPublishButtonStatus: jest.fn(),
    addRequestInformationSection: jest.fn(),
    deleteRequestInformationSection: jest.fn(),
    // publishNewRequestData: jest.fn(),
    // draftNewRequestData: jest.fn(),
    // update_request: jest.fn(() =>
    //   Promise.resolve({
    //     data: {
    //       status: "success",
    //       data: [{ request_title: "New Request Title" }]
    //     }
    //   })
    // ),
    create_new_request: jest.fn(),
    getInitiator: jest.fn(),
    clearLocation: jest.fn(),
    populateLocations: jest.fn(),
    change_active_section: jest.fn(),
    setLoadingMode: jest.fn()
  };

  router = new VueRouter({
    routes: []
  });

  store = new Vuex.Store({
    actions: mockActions,
    getters: {
      getRequestInformationSections: () => [
        {
          request_information_heading: "Heading",
          request_information_id: 17,
          request_information_text: "<p>Hello</p>",
          requestinformation: 25
        },
        {
          request_information_heading: "Heading2",
          request_information_id: 18,
          request_information_text: "<p>There</p>",
          requestinformation: 26
        }
      ],
      getIsRequestInputFilled: () => [],
      getSingleRequestData: () => id => {
        return {
          request_information: [{ information_title: "Title" }],
          is_draft: false
        };
      },
      getNewRequestData: () => {
        return {
          request_title: "Request Title",
          request_information: [{ information_title: "Title" }]
        };
      },
      getInitiatorId: () => []
    }
  });

  wrapper = shallowMount(InformationSection, {
    store,
    localVue,
    router,
    stubs: [
      "base-button",
      "base-input",
      "CKEditorComponent",
      "base-spinner",
      "section-header",
      "section-footer"
    ],
    propsData: {
      activeMe: true
    }
  });
});

describe("Create Request Information Section", () => {
  it("(if isEdit) dispatches actions on mounted", () => {
    wrapper.setProps({ isEdit: true });
    const mockSetButtonsLabel = jest.spyOn(wrapper.vm, "setButtonsLabel");
    jest.useFakeTimers();
    setTimeout(() => {
      expect(mockActions.setRequestInformationSection).toHaveBeenCalled();
      expect(mockActions.setRequestInformationSection).toHaveBeenCalledWith(
        expect.any(Object),
        {
          information_title: "Title"
        }
      );
      expect(mockSetButtonsLabel).toHaveBeenCalled();
      // expect(mockActions.setRequestPublishButtonStatus).toHaveBeenCalled();
    }, 100);
  });

  it("has 2 sections for 2 information section data", () => {
    const sections = wrapper.findAll(".sections");
    expect(sections.exists()).toBe(true);
    expect(sections.length).toBe(2);
  });

  it("has div with section index number and delete button", () => {
    const accordion_section = wrapper.findAll(".accordion-section").at(0);
    expect(accordion_section.exists()).toBe(true);
    expect(accordion_section.text()).toContain("1");
    const subsection_delete = wrapper.findAll(".subsection-delete").at(0);
    expect(subsection_delete.exists()).toBe(true);
  });

  it("has input for information header", () => {
    const input = wrapper.findAll("base-input-stub").at(0);
    expect(input.exists()).toBe(true);
  });

  it("has ckeditor for information text", () => {
    const ckeditor = wrapper.findAll("CKEditorComponent-stub").at(0);
    expect(ckeditor.exists()).toBe(true);
  });

  // it("has a button that calls addSection method on click", async () => {
  //   const button = wrapper.find("base-button");
  //   expect(button.exists()).toBe(true);
  //   const mockAddSection = jest.spyOn(wrapper.vm, "addSection");
  //   await button.vm.$emit("click");
  //   expect(mockAddSection).toHaveBeenCalled();
  // });

});
