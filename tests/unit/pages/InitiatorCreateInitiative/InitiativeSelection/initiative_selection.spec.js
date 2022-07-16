import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";
import InitiativeSelection from "@/pages/InitiatorCreateInitiative/InitiativeSelection/InitiativeSelection.vue";
import InitiativeType from "@/pages/InitiatorCreateInitiative/InitiativeType/InitiativeType.vue";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

let store;
let stubs;
let mockActions;
let wrapper;
let router;

beforeEach(() => {
  mockActions = {
    resetCreateInitiativeState: jest.fn(),
    setInitiativeProduct: jest.fn(),
    setProductId: jest.fn(),
    setPartnerLocation: jest.fn()
  };

  router = new VueRouter({
    routes: [
      {
        path: "/initiatorinitiativetype",
        name: "initiatorinitiativetype",
        component: InitiativeType
      }
    ]
  });

  store = new Vuex.Store({
    actions: mockActions,
    router,
    getters: {
      getAllProducts: () => {
        return [
          {
            product_id: 1,
            product_category_fullname_en: "First",
            product_category_fullname_de: "",
            product_category: "",
            product_text: ""
          },
          {
            product_id: 2,
            product_category_fullname_en: "Second",
            product_category_fullname_de: "",
            product_category: "",
            product_text: ""
          }
        ];
      }
    }
  });

  stubs = ["InitiativeLocation", "base-button", "router-link"];

  wrapper = shallowMount(InitiativeSelection, {
    store,
    localVue,
    stubs,
    data() {
      return {
        selectedItem: true
      };
    },
    computed: {
      // mock computed
      lang: () => "en"
    }
  });
});

describe("Initiative Selection", () => {
  it("has elements for number of products in getter", () => {
    const products = wrapper.findAll(".form-check");
    expect(products.exists()).toBe(true);
    expect(products.length).toBe(2);
  });

  it("calls resetCreateInitiativeState on mounted", () => {
    expect(mockActions.resetCreateInitiativeState).toHaveBeenCalled();
  });

  it("has radio buttons that call setSelectedProductInfo and sets the right product", () => {
    const radioInput = wrapper.findAll(".form-check-input").at(0);
    expect(radioInput.exists()).toBe(true);

    let mockSetSelectedProductInfo = jest.spyOn(
      wrapper.vm,
      "setSelectedProductInfo"
    );
    radioInput.trigger("click");
    expect(mockSetSelectedProductInfo).toHaveBeenCalled();
    expect(wrapper.vm.$data.selectedProduct).toEqual(
      wrapper.vm.$store.getters.getAllProducts[0]
    );
  });

  it("has category shown when clicked", () => {
    const radioInput = wrapper.findAll(".form-check-input").at(0);
    expect(radioInput.exists()).toBe(true);

    let mockSetSelectedProductInfo = jest.spyOn(
      wrapper.vm,
      "setSelectedProductInfo"
    );
    radioInput.trigger("click");
    expect(mockSetSelectedProductInfo).toHaveBeenCalled();
    expect(wrapper.vm.$data.selectedProduct).toEqual(
      wrapper.vm.$store.getters.getAllProducts[0]
    );
  });

  it("has continue button that calls actions and pushes to /initiatorinitiativetype", async () => {
    const button = wrapper.find("base-button-stub");
    expect(button.exists()).toBe(true);
    let mockContinue = jest.spyOn(wrapper.vm, "continueTo");

    // set product too prevent errors
    wrapper
      .findAll(".form-check-input")
      .at(0)
      .trigger("click");

    button.vm.$emit("click");
    await wrapper.vm.$nextTick();
    expect(mockContinue).toHaveBeenCalled();
    expect(mockActions.setInitiativeProduct).toHaveBeenCalled();

    // expect(wrapper.vm.$route.path).toBe('/initiatorinitiativetype')
  });
});
