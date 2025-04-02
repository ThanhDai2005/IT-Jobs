import { del, get, patch, post } from "../utils/request";

export const getAllJob = async () => {
  const result = await get(`jobs`);
  return result;
};

export const getJobDetail = async (id) => {
  const result = await get(`jobs/${id}`);
  return result;
};

export const getJobCompany = async (idCompany) => {
  const result = await get(`jobs?idCompany=${idCompany}`);
  return result;
};

export const createJob = async (options) => {
  const result = await post("jobs", options);
  return result;
};

export const updateJob = async (id, options) => {
  const result = await patch(`jobs/${id}`, options);
  return result;
};

export const deleteJob = async (id) => {
  const result = await del(`jobs/${id}`);
  return result;
};
