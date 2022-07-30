import { config } from "@vue/test-utils";

import translations from "../../src/locales/en.json";

config.mocks["$notify"] = message => {
  return message;
};

config.mocks["$t"] = key => {
  let values = key.split(".");
  let search = "";
  values.map(x => {
    if (search == "") {
      search = translations[x];
    } else {
      search = search[x];
    }
  });
  return search;
};
