import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";

import InitiativeTable from "@/pages/InitiatorInitiative/InitiativeTable.vue";
import InitiatorCreateInitiativeType from "@/pages/InitiatorCreateInitiative/InitiativeType/InitiativeType.vue";
import InitiatorCreateInitiativeSelection from "@/pages/InitiatorCreateInitiative/InitiativeSelection/InitiativeSelection.vue";

import InitiatorParticipant from "@/pages/InitiatorParticipants/InitiatorParticipant.vue";
import Messages from "@/pages/InitiatorInitiative/Messages.vue";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

let wrapper;
let store;
let mockActions;
let router;
let initiatives = [
  {
    customer_deadline_for_offer_acceptance: "2021-08-13T00:00:00",
    initiative_country: "Germany",
    initiative_discountmin: 15,
    initiative_enddate: "2021-05-20T00:00:00",
    initiative_id: 2,
    initiative_installer: [],
    initiative_region: "Oldenburger Münsterland",
    initiative_slug: "pVZTpFagwwTASgaB",
    initiative_specific: Array[36],
    initiative_startdate: "2021-01-02T00:00:00",
    initiative_thresholdmin: 18,
    initiative_title: "PILZ-ISOLIERUNG",
    installation_offers_sent_date: "2021-07-26T00:00:00",
    installation_performed_and_final_bill_uploaded_date: "2021-09-02T00:00:00",
    installer_key: null,
    participants: [],
    initiative_type: "interest collection",
    initiative_partner: "self_reliant_partner",
    is_draft: false
  }
];

beforeEach(() => {
  mockActions = {
    sendInstallerKey: jest.fn(),
    setSelectedInitiative: jest.fn(),
    getAllProducts: jest.fn(),
    getCurrentInitiative: jest.fn(),
    setInitiativeProductText: jest.fn(),
    setLoadingMode: jest.fn(),
  };

  router = new VueRouter({
    routes: [
      {
        path: "/initiatorcreateinitiative",
        name: "initiatorcreateinitiative",
        component: InitiatorCreateInitiativeSelection
      },
      {
        path: "/initiatorinitiativetype",
        name: "initiatorinitiativetype",
        component: InitiatorCreateInitiativeType
      },
      {
        path: "/initiatormessages",
        name: "initiatormessages",
        component: Messages
      },
      {
        path: "/initiatorparticipants",
        name: "initiatorparticipants",
        component: InitiatorParticipant
      }
    ]
  });

  store = new Vuex.Store({
    actions: mockActions,
    getters: {
      getInitiatorInitiativeData: () => initiatives,
      getInitiatorInstallers: () => initiative_id => []
    }
  });

  wrapper = shallowMount(InitiativeTable, {
    store,
    localVue,
    router,
    stubs: [
      "base-input",
      "base-button",
      "router-link",
      "initiative-title-image",
      "base-spinner"
    ]
  });

  wrapper.setData({
    showModal: false,
    initiatives: initiatives
  });
});

describe("Initiator Initiative", () => {
  it("calls navigate function and navigates to /initiatorcreateinitiative when create new initiative button is clicked", async () => {
    const newInitiativeButton = wrapper.findAll("base-button-stub").at(0);
    expect(newInitiativeButton.exists()).toBe(true);
    const mockNavigate = jest.spyOn(wrapper.vm, "navigate");
    await newInitiativeButton.vm.$emit("click");
    expect(mockNavigate).toHaveBeenCalled();
    expect(wrapper.vm.$route.path).toBe("/initiatorcreateinitiative");
  });

  it("has a initiatives div for all initiatives", () => {
    const initiatives = wrapper.find(".initiatives");
    expect(initiatives.exists()).toBe(true);
  });

  it("has a initiative-title-image component", () => {
    const initiative_title_image = wrapper.find("initiative-title-image-stub");
    expect(initiative_title_image.exists()).toBe(true);
  });

  it("has initiative-item divs that are not empty for valid initiatives data", () => {
    const initiative_item = wrapper.findAll(
      ".initiatives > div > .initiative-item"
    );
    expect(initiative_item.length).not.toEqual(0);
  });

  it("has initiative info with title and id", () => {
    const initiative_title = wrapper.find(".initiative-title");
    expect(initiative_title.exists()).toBe(true);
    expect(initiative_title.text()).toContain(
      wrapper.vm.$data.initiatives[0].initiative_title
    );
    expect(initiative_title.text()).toContain(
      wrapper.vm.$data.initiatives[0].initiative_id
    );
  });

  it("has 6 buttons in initiative links div", () => {
    const initiative_links = wrapper.findAll(".initiative-link");
    expect(initiative_links.length).toBe(4);
  });

  it("has a participants button with router link to /initiatorparticipants", () => {
    const participants_button = wrapper.findAll(".initiative-link").at(0);
    expect(participants_button.exists()).toBe(true);
    const router_link = participants_button.find("router-link-stub");
    expect(router_link.exists()).toBe(true);
    expect(router_link.attributes().to).toBe("/initiatorparticipants");
  });

  // it('has a materials button', () => {
  //   const materials_button = wrapper.findAll('.initiative-link').at(1)
  //   expect(materials_button.exists()).toBe(true)
  // })

  // it('has a statistics button', () => {
  //   const stat_button = wrapper.findAll('.initiative-link').at(2)
  //   expect(stat_button.exists()).toBe(true)
  // })

  it("has a edit button wich routes to /initiatorinitiativeform", async () => {
    const mockEditInitiative = jest.spyOn(wrapper.vm, "editInitiative");
    const edit = wrapper.findAll(".initiative-link").at(1);
    const edit_button = edit.find("base-button-stub");
    expect(edit_button.exists()).toBe(true);

    edit_button.vm.$emit("click");
    expect(mockEditInitiative).toHaveBeenCalled();
    expect(mockActions.setSelectedInitiative).toHaveBeenCalled();
    expect(mockActions.getCurrentInitiative).toHaveBeenCalled();

    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$route.path).toBe("/initiatorinitiativeform");
  });

  it("has a messages button with router link to /initiatormessages", () => {
    const mockSetSelectedInitiativeID = jest.spyOn(
      wrapper.vm,
      "setSelectedInitiativeID"
    );
    const messages = wrapper.findAll(".initiative-link").at(2);

    const router_link = messages.find("router-link-stub");
    expect(router_link.exists()).toBe(true);
    expect(router_link.attributes().to).toBe("/initiatormessages");

    const messages_button = router_link.find("base-button-stub");
    expect(messages_button.exists()).toBe(true);

    messages_button.vm.$emit("click");
    expect(mockSetSelectedInitiativeID).toHaveBeenCalled();
    expect(mockActions.setSelectedInitiative).toHaveBeenCalled();
  });

  it("has access key button which calls openModal when clicked on", () => {
    let acceskey_div = wrapper.findAll(".initiative-link").at(3);
    expect(acceskey_div.exists()).toBe(true);
    let acceskey_button = acceskey_div.find("base-button-stub");
    expect(acceskey_button.exists()).toBe(true);
    let mockOpenModal = jest.spyOn(wrapper.vm, "openModal");
    acceskey_button.vm.$emit("click");
    expect(mockOpenModal).toHaveBeenCalled();
  });

  it("shows initiative status", () => {
    const status = wrapper.find(".span-iniative-status");
    expect(status.exists()).toBe(true);
    expect(status.text()).toBe("Expired");
  });
});

describe("Initiator Initiative Modal", () => {
  it("renders modal depending on showModal data value", async () => {
    expect(wrapper.find(".modal").exists()).toBe(false);

    wrapper.setData({ showModal: true });
    await wrapper.vm.$nextTick();

    expect(wrapper.find(".modal").exists()).toBe(true);
  });

  it("has calls closeModal method when icon for closing modal clicked", async () => {
    wrapper.setData({ showModal: true });
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".modal").exists()).toBe(true);

    const closeButton = wrapper.find("button");
    expect(closeButton.exists()).toBe(true);
    const mockCloseModal = jest.spyOn(wrapper.vm, "closeModal");
    closeButton.trigger("click");
    expect(mockCloseModal).toHaveBeenCalled();
  });

  it("displays send key forms when installer and advisor data are empty", async () => {
    wrapper.setData({ showModal: true });
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".modal-body").exists()).toBe(true);

    wrapper.setData({ installers: [] });
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll("form").length).toBe(2);
    const inputs = wrapper.findAll("base-input-stub");
    expect(inputs.at(0).attributes().label).toBe("Execution Partner");
  });

  it("calls sendInstallerKey method when send access keys button clicked", async () => {
    wrapper.setData({ showModal: true, installers: [] });
    await wrapper.vm.$nextTick();
    const sendInstallerKeyBtn = wrapper.find(
      "form:first-of-type > base-button-stub"
    );
    expect(sendInstallerKeyBtn.exists()).toBe(true);

    const mocksendInstallerKey = jest.spyOn(wrapper.vm, "sendInstallerKey");
    sendInstallerKeyBtn.vm.$emit("click");
    await wrapper.vm.$nextTick();
    wrapper.setData({
      showModal: true,
      installers: [
        {
          installer_name: "new installer",
          initiative_installer_id: "8",
          status: "confirmation awaited"
        }
      ]
    });
    await wrapper.vm.$nextTick();
    expect(mocksendInstallerKey).toHaveBeenCalled();
  });

  it('displays resend key forms when installer and advisor status are "confirmation awaited"', async () => {
    wrapper.setData({ showModal: true });
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".modal-body").exists()).toBe(true);

    wrapper.setData({
      installers: [
        {
          installer_name: "new installer",
          initiative_installer_id: "8",
          status: "confirmation awaited"
        }
      ]
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.findAll("form").length).toBe(3);
    expect(wrapper.find(".modal-form:first-of-type > div").exists()).toBe(
      false
    );

    const modal = wrapper.find(".modal");
    const inputs = modal.findAll("base-input-stub");
    expect(inputs.at(0).attributes().label).toBe("Execution Partner");

    const button1 = modal.findAll("base-button-stub").at(0);
  });

  it("calls resendInstallerKey method when send access keys button clicked", async () => {
    wrapper.setData({
      showModal: true,
      installers: [
        {
          installer_name: "new installer",
          initiative_installer_id: "8",
          status: "confirmation awaited"
        }
      ]
    });
    await wrapper.vm.$nextTick();
    const modal = wrapper.find(".modal");
    const resendInstallerKeyBtn = modal.findAll("base-button-stub").at(0);

    const mockresendInstallerKey = jest.spyOn(wrapper.vm, "resendInstallerKey");
    resendInstallerKeyBtn.vm.$emit("click");
    await wrapper.vm.$nextTick();
    wrapper.setData({
      showModal: true,
      installers: [
        {
          installer_name: "new installer",
          initiative_installer_id: "8",
          status: "confirmation awaited"
        }
      ]
    });
    await wrapper.vm.$nextTick();
    expect(mockresendInstallerKey).toHaveBeenCalled();
  });


  it('displays divs with infos when installer and advisor status are "verified"', async () => {
    wrapper.setData({ showModal: true });
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".modal-body").exists()).toBe(true);

    wrapper.setData({
      installers: [
        {
          installer_name: "new installer",
          initiative_installer_id: "8",
          status: "verified"
        }
      ]
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll("form").length).toBe(3);
    expect(wrapper.findAll("base-input-stub").length).toBe(1);

    expect(wrapper.findAll(".modal-body > div").length).toBe(1);

    expect(
      wrapper
        .findAll(".modal-body > div")
        .at(0)
        .text()
    ).toContain(wrapper.vm.$data.installers[0].installer_name);
  });

  it("Shows all filter values with one active", () => {
    const filters = wrapper.findAll(".filter-items");
    expect(filters.length).toBe(4);
    const all_filter = wrapper.findAll(".active-filter");
    expect(all_filter.length).toBe(1);
  });

  it("calls setFilter on clicking filter item", () => {
    const mockSetFilter = jest.spyOn(wrapper.vm, "setFilter");
    const filter = wrapper.findAll(".filter-items").at(0);
    filter.trigger("click");
    expect(mockSetFilter).toHaveBeenCalled();
  });
});
