import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import mockService from "../../service/mock";

const initialState = {
  loading: false,
  mockData: [],
  error: "",
  activeId: null,
};

export const fetchMockData = createAsyncThunk(
  "mock/fetchMockData",
  (params = {}) => {
    return mockService.get({ ...params }).then((res) => res);
  }
);

const mockSlice = createSlice({
  name: "mock",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchMockData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMockData.fulfilled, (state, action) => {
      const { payload } = action;
      state.loading = false;
      state.mockData = payload.data;
      state.error = "";
    });
    builder.addCase(fetchMockData.rejected, (state, action) => {
      state.loading = false;
      state.mockData = [];
      state.error = action.error.message;
    });
  },
  reducers: {
    setActive(state, action) {
      state.activeId = action.payload;
    },
  },
});
export const { setActive } = mockSlice.actions;
export default mockSlice.reducer;
