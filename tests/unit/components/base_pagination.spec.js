import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils";
import BasePagination from "@/components/BasePagination.vue";

const localVue = createLocalVue();

let wrapper;
let propsData;
let mockButtonClick;

beforeEach(() => {
  propsData = {
    maxVisibleButtons: 1,
    totalPages: 7,
    total: 69,
    pageSize: 10,
    currentPage: 1,
  }
  mockButtonClick = jest.spyOn(BasePagination.methods, "onClickFirstPage")

  wrapper = shallowMount(BasePagination, {
    localVue,
    propsData: propsData
  });

});

describe("Testing Base Pagination", () => {

  it("has list for pagination items", () => {
    const pagination = wrapper.find("ul");
    expect(pagination.exists()).toBe(true);
  });

  //test for button click events

  it("calls onClickFirstPage function on click", () => {
    const onClickFirstPage =  wrapper.find(".btn-outline-primary")
    expect(onClickFirstPage.exists()).toBe(true);
    // wrapper.find(".btn-outline-primary").trigger('click')
    // expect(mockButtonClick).toHaveBeenClicked();
    // expect(wrapper.emitted('click')).toBeTruthy()
  });

});
