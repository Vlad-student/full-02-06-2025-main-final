import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSearchProducts } from "../api";

export const searchProductThunk = createAsyncThunk(
  "products/searchProductThunk",
  async (searchQuery, thunkAPI) => {
    try {
      const response = await getSearchProducts(searchQuery);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    products: [],
    isLoading: false,
    error: null,
    searchQuery: "",
  },
  reducers: {
    clearSearchResults: (state) => {
      state.products = [];
      state.searchQuery = "";
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchProductThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchProductThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.products = action.payload;
      })
      .addCase(searchProductThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSearchResults, setSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;
