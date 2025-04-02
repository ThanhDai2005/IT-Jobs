import { del, get, patch, post } from "../utils/request";

export const createCV = async (options) => {
  const result = await post("cv", options);
  return result;
};

export const getListCV = async () => {
  const result = await get("cv");
  return result;
};

export const getCVCompany = async (options) => {
  const result = await get(`cv?idCompany=${options}`);
  return result;
};

export const getCV = async (id) => {
  const result = await get(`cv/${id}`);
  return result;
};

export const deleteCV = async (id) => {
  const result = await del(`cv/${id}`);
  return result;
};

export const changeStatusCV = async (id, options) => {
  const result = await patch(`cv/${id}`, options);
  return result;
};
