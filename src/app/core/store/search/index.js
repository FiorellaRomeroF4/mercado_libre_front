import { createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../services/axiosInstance";

export const slice = createSlice({
  name: "items",
  initialState: {
    searchList: null,
    itemDetail: null,
    isLoading: false,
    isSuccess: false,
    isFail: false,
    isLoadingDetail: false,
    isSuccessDetail: false,
    isFailDetail: false,
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
    getItemDetailRequest: (state) => {
      return {
        ...state,
        isLoadingDetail: true,
        isSuccessDetail: false,
        isFailDetail: false,
      };
    },
    getItemDetailSuccess: (state, action) => {
      return {
        ...state,
        itemDetail: action.payload,
        isLoadingDetail: false,
        isSuccessDetail: true,
        isFailDetail: false,
      };
    },
    getItemDetailFail: (state, action) => {
      return {
        ...state,
        isLoadingDetail: false,
        isSuccessDetail: false,
        isFailDetail: true,
        error: action.payload,
      };
    },
  },
});

export default slice.reducer;

export const {
  getItemsListRequest,
  getItemsListSuccess,
  getItemsListFail,
  getItemDetailRequest,
  getItemDetailSuccess,
  getItemDetailFail,
} = slice.actions;

export const getItemsList = (searchWord) => async (dispatch) => {
  dispatch(getItemsListRequest());
  try {
    const res = await axiosClient.get(`/items?q=${searchWord}`);
    dispatch(getItemsListSuccess(res.data));
  } catch (error) {
    dispatch(getItemsListFail(error.response.data));
  }
};

export const getItemDetail = (id) => async (dispatch) => {
  dispatch(getItemDetailRequest());
  try {
    const res = await axiosClient.get(`items/${id}`);
    dispatch(getItemDetailSuccess(res.data));
  } catch (error) {
    dispatch(getItemDetailFail(error.response.data));
  }
};
