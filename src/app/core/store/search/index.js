import { createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../services/axiosInstance";

export const slice = createSlice({
  name: "search",
  initialState: {
    searchList: null,
    isLoading: false,
    isSuccess: false,
    isFail: false,
    error: {},
  },
  reducers: {
    getItemsListRequest: (state) => {
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isFail: false,
      };
    },
    getItemsListSuccess: (state, action) => {
      return {
        ...state,
        searchList: action.payload,
        isLoading: false,
        isSuccess: true,
        isFail: false,
      };
    },
    getItemsListFail: (state, action) => {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        isSuccess: false,
        isFail: true,
      };
    },
  },
});

export default slice.reducer;

export const { getItemsListRequest, getItemsListSuccess, getItemsListFail } =
  slice.actions;

export const getItemsList = (searchWord) => async (dispatch) => {
  dispatch(getItemsListRequest());
  try {
    // const res = await axiosClient.get(`/items?q=${searchWord}`);
    const res = {
      autor: {
        name: "Fiorella",
        lastname: "Romero Fuentes",
      },
      categories: ["Belleza, Calzado, Ropa"],
      items: [
        {
          id: "100",
          title: "Cosmetiquera",
          price: {
            currency: "COP",
            amount: 1,
            decimals: 0,
          },
          picture:
            "https://tse1.mm.bing.net/th?id=OIP.TsQx4vfsWBtNYFjhivUV2gHaHa&pid=Api&P=0",
          condition: "Nuevo",
          free_shipping: true,
        },
        {
          id: "100",
          title: "Cosmetiquera",
          price: {
            currency: "COP",
            amount: 1,
            decimals: 0,
          },
          picture:
            "https://tse1.mm.bing.net/th?id=OIP.TsQx4vfsWBtNYFjhivUV2gHaHa&pid=Api&P=0",
          condition: "Nuevo",
          free_shipping: false,
        },
      ],
    };
    dispatch(getItemsListSuccess(res));
  } catch (error) {
    dispatch(getItemsListFail(error.response.data));
  }
};
