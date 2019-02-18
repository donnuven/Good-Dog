import * as global from "./serviceHelpers";
import axios from "axios";

let addPrivacyPolicy = payload => {
  const config = {
    method: "POST",
    url: global.API_HOST_PREFIX + "/api/privacypolicy",
    data: payload,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(global.onGlobalSuccess)
    .catch(global.onGlobalError);
};

let getPrivacyPolicy = () => {
  const config = {
    method: "GET",
    url: global.API_HOST_PREFIX + "/api/privacypolicy",
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(global.onGlobalSuccess)
    .catch(global.onGlobalError);
};

let getSpecificPrivacyPolicy = id => {
  const config = {
    method: "GET",
    url: global.API_HOST_PREFIX + "/api/privacypolicy/" + id,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(global.onGlobalSuccess)
    .catch(global.onGlobalError);
};

let editPrivacyPolicy = (id, payload) => {
  const config = {
    method: "PUT",
    url: global.API_HOST_PREFIX + "/api/privacypolicy/" + id,
    data: payload,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(global.onGlobalSuccess)
    .catch(global.onGlobalError);
};

let deletePrivacyPolicy = id => {
  const config = {
    method: "DELETE",
    url: global.API_HOST_PREFIX + "/api/privacypolicy/" + id,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(global.onGlobalSuccess)
    .catch(global.onGlobalError);
};

let updateAndSortMany = (id, payload) => {
  const config = {
    method: "PUT",
    data: payload,
    url: global.API_HOST_PREFIX + "/api/privacypolicy" + id
  };
  return axios(config)
    .then(global.onGlobalSuccess)
    .catch(global.onGlobalError);
};

export {
  addPrivacyPolicy,
  deletePrivacyPolicy,
  editPrivacyPolicy,
  getPrivacyPolicy,
  getSpecificPrivacyPolicy,
  updateAndSortMany
};
