import * as global from "./serviceHelpers";
import axios from "axios";

let addTermsAndConditions = payload => {
  const config = {
    method: "POST",
    url: global.API_HOST_PREFIX + "/api/termsandconditions",
    data: payload,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(global.onGlobalSuccess)
    .catch(global.onGlobalError);
};

let getTermsAndConditions = () => {
  const config = {
    method: "GET",
    url: global.API_HOST_PREFIX + "/api/termsandconditions",
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(global.onGlobalSuccess)
    .catch(global.onGlobalError);
};

let getTermsAndConditionsById = id => {
  const config = {
    method: "GET",
    url: global.API_HOST_PREFIX + "/api/termsandconditions/" + id,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(global.onGlobalSuccess)
    .catch(global.onGlobalError);
};

let editTermsAndConditionsById = (id, payload) => {
  const config = {
    method: "PUT",
    url: global.API_HOST_PREFIX + "/api/termsandconditions/" + id,
    data: payload,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(global.onGlobalSuccess)
    .catch(global.onGlobalError);
};

let deleteTermsAndConditions = id => {
  const config = {
    method: "DELETE",
    url: global.API_HOST_PREFIX + "/api/termsandconditions/" + id,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(global.onGlobalSuccess)
    .catch(global.onGlobalError);
};

export {
  addTermsAndConditions,
  editTermsAndConditionsById,
  deleteTermsAndConditions,
  getTermsAndConditions,
  getTermsAndConditionsById
};
