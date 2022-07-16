import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";

import InstallerParticipant from "@/pages/InstallerParticipants/InstallerParticipant.vue";
import InstallerIntiatives from "@/pages/InstallerInitiative/InitiativeTable.vue";

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
  mockActions = {
    getInstaller: jest.fn(),
    setLoadingMode: jest.fn(),
    setSelectedInstallerInitiativeId: jest.fn()
  };

  router = new VueRouter({
    routes: [
      {
        path: "/installerinitiatives",
        name: "installerinitiatives",
        component: InstallerIntiatives
      }
    ]
  });

  store = new Vuex.Store({
    actions: mockActions,
    getters: {
      getInstallerInitiativesIds: () => [],
      getSelectedInstallerInitiativeId: () => "45",
      getInstallerInitiativeParticipants: () => id => tableData,
      getInstallerMilestones: () => id => milestones
    }
  });

  getCurrentIdSpy = jest.spyOn(InstallerParticipant.methods, "getCurrentId");

  wrapper = mount(InstallerParticipant, {
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
        prevRoute: { name: "installerinitiatives" }
      };
    }
  });

  InstallerParticipant.beforeRouteEnter.call(
    wrapper.vm,
    undefined,
    wrapper.vm.$router.options.routes[0],
    c => c(wrapper.vm)
  );
});

describe("Installer participants", () => {
  it("has a selection dropdown with initiative-list component", () => {
    const select_div = wrapper.find(".select");
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
