import { get, patch, post } from "../utils/request";

export const getListCompany = async () => {
  const result = await get("company");
  return result;
};

export const getDetailCompany = async (id) => {
  const result = await get(`company/${id}`);
  return result;
};

export const createCompany = async (options) => {
  const result = await post("company", options);
  return result;
};

export const editCompany = async (id, options) => {
  const result = await patch(`company/${id}`, options);
  return result;
};
