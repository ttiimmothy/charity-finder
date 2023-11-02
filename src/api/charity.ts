import axiosInstance from ".";
import { CharityListItem } from "../interfaces/CharityListItem";
import { NonprofitTag } from "../interfaces/NonprofitTag";

export const searchCharityList = async (
  searchKey: string
): Promise<{ nonprofits: CharityListItem[] }> => {
  const response = await axiosInstance.get(`/browse/${searchKey}`);
  return response.data;
};

export const searchCharityDetail = async (
  id: string
): Promise<{
  data: { nonprofit: CharityListItem; nonprofitTags: NonprofitTag[] };
}> => {
  try {
    const response = await axiosInstance.get(`/nonprofit/${id}`);
    return response.data;
  } catch (err) {
    if (err) {
      console.error(err);
    }
  }
  return Promise.reject("An error occurred while fetching charity details");
};
