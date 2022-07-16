import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";

import InitiatorParticipant from "@/pages/InitiatorParticipants/InitiatorParticipant.vue";
import InitiatorInitiatives from "@/pages/InitiatorInitiative/InitiativeTable.vue";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

let wrapper;
let store;
let mockActions;
let router;
let getCurrentIdSpy;
let milestones = [{ milestones: "milestones" }];
let tableData = [
  {
    bill_file_name: null,
    created_at: "2021-01-08T08:03:27",
    initiative_id: 32,
    offer_file_name: null,
    participant_bill_sent: false,
    participant_email: "moshrefizadeh@gmail.com",
    participant_flag: "accepted",
    participant_forename: "Dento",
    participant_id: 23,
    participant_initiative_status: "rejected",
    participant_offer_sent: false,
    participant_phone: "2435",
    participant_phone_alt: "32454325",
    participant_place: "town",
    participant_postcode: "3444",
    participant_streetHouse: "test test",
    participant_surname: "Kama",
    participant_uuid: "jskjfsjfj332"
  }
];

beforeEach(() => {
  mockActions = {};

  router = new VueRouter({
    routes: [
      {
        path: "/initiatorinitiatives",
        name: "initiatorinitiatives",
        component: InitiatorInitiatives
      }
    ]
  });

  store = new Vuex.Store({
    actions: mockActions,
    getters: {
      getInitiativesIdsForParticipants: () => [],
      getSelectedInitiativeId: () => "45",
      getInitiativeparticipants: () => id => tableData,
      getInitiatorMilestones: () => id => milestones
    }
  });

  getCurrentIdSpy = jest.spyOn(InitiatorParticipant.methods, "getCurrentId");

  wrapper = mount(InitiatorParticipant, {
    store,
    localVue,
    router,
    stubs: [
      "base-button",
      "base-input",
      "participants-table",
      "initiative-list",
      "milestones",
      "base-spinner"
    ],
    data() {
      return {
        milestones: {},
        prevRoute: { name: "initiatorinitiatives" }
      };
    }
  });

  InitiatorParticipant.beforeRouteEnter.call(
    wrapper.vm,
    undefined,
    wrapper.vm.$router.options.routes[0],
    c => c(wrapper.vm)
  );
});

describe("Initiator participants", () => {
  it("has a selection dropdown with initiative-list component", () => {
    const select_div = wrapper.find(".initiative-select");
    expect(select_div.exists()).toBe(true);
    const selection = wrapper.find("initiative-list-stub");
    expect(selection.exists()).toBe(true);
  });

  it("shows a participants table component for non-empty table data", () => {
    const participants_table = wrapper.find("participants-table-stub");
    expect(participants_table.exists()).toBe(true);
  });

  it("calls getCurrentId for initiative list", async () => {
    const initiative_list = wrapper.find("initiative-list-stub");
    initiative_list.vm.$emit("currentId");
    await wrapper.vm.$nextTick();
    expect(getCurrentIdSpy).toHaveBeenCalled();
  });
});
