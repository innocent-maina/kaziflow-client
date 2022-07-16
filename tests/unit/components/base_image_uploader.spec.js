import { shallowMount, createLocalVue } from "@vue/test-utils";
import BaseImageUploader from "@/components/BaseImageUploader.vue";

const localVue = createLocalVue();

let wrapper;
let propsData;
let mockSetWidthHeight
let mockUploadImage
let mockOnFileChange 
let mockCreateImage

beforeEach(() => {
  propsData = {
    "otherUrl": "",
    "getImage": "image_url",
    "src": "../../assets/images/logo.png",
    "aspectRatio": 1,
    "pickImage": "pickIcon"
  }

  mockSetWidthHeight = jest.spyOn(BaseImageUploader.methods, "setWidthHeight");
  mockUploadImage = jest.spyOn(BaseImageUploader.methods, "uploadImage");
  mockOnFileChange = jest.spyOn(BaseImageUploader.methods, "onFileChange");
  mockCreateImage = jest.spyOn(BaseImageUploader.methods, "createImage");

  wrapper = shallowMount(BaseImageUploader, {
    localVue,
    propsData: propsData,
    stubs: ["base-upload-icon", "base-upload-spinner", "avatar-cropper", "base-input"],
    data() {
      return {
        
      }
    }
  });

});

describe("Testing Base Pdf Uploader", () => {
  it("shows div with image if otherUrl is true", () => {
    wrapper = shallowMount(BaseImageUploader, {
      localVue,
      propsData: {otherUrl: "other_url"},
      stubs: ["base-upload-icon", "base-upload-spinner", "avatar-cropper"],
    });

    const other_image = wrapper.find(".other-image");
    expect(other_image.attributes().src).toEqual("other_url");
  });

  it("shows image uploader if no otherUrl defined", () => {
    const pick_image = wrapper.find("#pickIcon");
    expect(pick_image.exists()).toBe(true);
  });

  it("loads image from parent if there's previously uploaded image", () => {
    const uploaded_image = wrapper.findAll(".uploaded-image").at(0);
    expect(uploaded_image.exists()).toBe(true);
    expect(uploaded_image.attributes().src).toEqual("image_url");
    uploaded_image.trigger("load");
    expect(mockSetWidthHeight).toHaveBeenCalled();
  });

  it("shows a div with background if there is no previously uploaded image and no currently uploaded image", () => {
    wrapper = shallowMount(BaseImageUploader, {
      localVue,
      propsData: {"getImage": ""},
      stubs: ["base-upload-icon", "base-upload-spinner", "avatar-cropper"],
    });

    const has_no_image_container = wrapper.find(".has-no-image-container");
    expect(has_no_image_container.exists()).toBe(true);
  });

});
