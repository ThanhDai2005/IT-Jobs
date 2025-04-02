import { get } from "../utils/request";

export const getListTags = async () => {
  const result = await get("tags");
  return result;
};
