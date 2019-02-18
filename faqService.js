import * as global from "./serviceHelpers";
import axios from "axios";

let getFaq = () => {
  const config = {
    method: "GET",
    url: global.API_HOST_PREFIX + "/api/faq",
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
    .then(global.onGlobalSuccess)
    .catch(global.onGlobalError);
};

let addFaq = payload => {
  const config = {
    method: "POST",
    url: global.API_HOST_PREFIX + "/api/faq",
    data: payload,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(global.onGlobalSuccess)
    .catch(global.onGlobalError);
};

let editFaq = (id, payload) => {
  const config = {
    method: "PUT",
    url: global.API_HOST_PREFIX + "/api/faq/" + id,
    data: payload,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(global.onGlobalSuccess)
    .catch(global.onGlobalError);
};

let getSpecificFaq = id => {
  const config = {
    method: "GET",
    url: global.API_HOST_PREFIX + "/api/faq/" + id,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
    .then(global.onGlobalSuccess)
    .catch(global.onGlobalError);
};

let getFaqByCategories = () => {
  const config = {
    method: "GET",
    url: global.API_HOST_PREFIX + "/api/faq/categories",
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(global.onGlobalSuccess)
    .catch(global.onGlobalError);
};

let getFaqByCategoryId = id => {
  const config = {
    method: "GET",
    url: global.API_HOST_PREFIX + "/api/faq/category" + id,
    header: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(global.onGlobalSuccess)
    .catch(global.onGlobalError);
};

let deleteFaq = id => {
  const config = {
    method: "DELETE",
    url: global.API_HOST_PREFIX + "/api/faq/" + id,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(global.onGlobalSuccess)
    .catch(global.onGlobalError);
};

export {
  addFaq,
  editFaq,
  deleteFaq,
  getFaq,
  getFaqByCategories,
  getFaqByCategoryId,
  getSpecificFaq
};
