import { getItemDetail, getItemsList } from "../../core/store/search/index";
import { axiosClient } from "../../core/services/axiosInstance";
import store from "../../core/store";

const getItems = () => {
  const { items } = store.getState();
  expect(items).not.toBeUndefined();
  return items;
};

test("get items list success", async () => {
  jest.mock("../../core/services/axiosInstance");
  axiosClient.get = jest.fn().mockResolvedValue({
    data: true,
  });

  const searchWord = "Celular";
  await store.dispatch(getItemsList(searchWord));
  expect(axiosClient.get).toHaveBeenCalledTimes(1);

  const items = getItems();
  const { isLoading, isSuccess, isFail } = items;
  const itemsSection = {
    isLoading,
    isSuccess,
    isFail,
  };
  expect(itemsSection).toMatchInlineSnapshot(`
    {
      "isFail": false,
      "isLoading": false,
      "isSuccess": true,
    }
  `);
});

test("get item detail success", async () => {
  jest.mock("../../core/services/axiosInstance");
  axiosClient.get = jest.fn().mockResolvedValue({
    data: true,
  });

  const id = "ML5435";
  await store.dispatch(getItemDetail(id));
  expect(axiosClient.get).toHaveBeenCalledTimes(1);

  const items = getItems();
  const { isLoadingDetail, isSuccessDetail, isFailDetail } = items;
  const itemsSection = {
    isLoadingDetail,
    isSuccessDetail,
    isFailDetail,
  };
  expect(itemsSection).toMatchInlineSnapshot(`
    {
      "isFailDetail": false,
      "isLoadingDetail": false,
      "isSuccessDetail": true,
    }
  `);
});
