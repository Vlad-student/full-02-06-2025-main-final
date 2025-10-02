import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getOneProduct,
  getProductsOnSale,
  getCategoriesForFilter,
} from "../api";
import { pendingCase, rejectedCase } from "./functions";

export const getOneProductThunk = createAsyncThunk(
  "products/getOneProductThunk",
  async (id, thunkAPI) => {
    try {
      const response = await getOneProduct(id);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const getAllProductsOnSaleThunk = createAsyncThunk(
  "products/getAllProductsOnSaleThunk",
  async (_, thunkAPI) => {
    try {
      const response = await getProductsOnSale();
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const getAllProductsThunk = createAsyncThunk(
  "products/getAllProductsThunk",
  async (values, thunkAPI) => {
    try {
      const response = await getAllProducts();
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const createProductThunk = createAsyncThunk(
  "products/createProductThunk",
  async (values, thunkAPI) => {
    try {
      const response = await createProduct(values);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const updateProductThunk = createAsyncThunk(
  "products/updateProductThunk",
  async ({ id, values }, thunkAPI) => {
    try {
      const response = await updateProduct(id, values);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const deleteProductThunk = createAsyncThunk(
  "products/deleteProductThunk",
  async (id, thunkAPI) => {
    try {
      const response = await deleteProduct(id);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const getFilteredProductsThunk = createAsyncThunk(
  "products/getFilteredProductsThunk",
  async (filters = {}, thunkAPI) => {
    try {
      const response = await getAllProducts(filters);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const getCategoriesForFilterThunk = createAsyncThunk(
  "products/getCategoriesForFilterThunk",
  async (_, thunkAPI) => {
    try {
      const response = await getCategoriesForFilter();
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

const initialFiltersState = {
  page: 1,
  limit: 12,
  minPrice: "",
  maxPrice: "",
  category: "",
  availability: false,
  sale: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    saleProducts: [],
    results: [],
    error: null,
    isLoading: false,
    selectedProduct: null,

    filteredProducts: [],
    categoriesForFilter: [],
    filters: initialFiltersState,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalProducts: 0,
      handleNext: false,
      handlePrev: false,
      limit: 12,
    },
  },

  reducers: {
    updateFilter: (state, action) => {
      const { key, value } = action.payload;
      state.filters[key] = value;
      if (key !== "page") {
        state.filters.page = 1;
      }
    },
    resetFilters: (state) => {
      state.filters = initialFiltersState;
    },
    setPage: (state, action) => {
      state.filters.page = action.payload;
    },
    clearFilterError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFilteredProductsThunk.pending, pendingCase);
    builder.addCase(getFilteredProductsThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(getFilteredProductsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.filteredProducts = action.payload.data;
    });

    builder.addCase(getCategoriesForFilterThunk.fulfilled, (state, action) => {
      state.categoriesForFilter = action.payload;
    });

    builder.addCase(getAllProductsOnSaleThunk.pending, pendingCase);
    builder.addCase(getAllProductsOnSaleThunk.rejected, rejectedCase);
    builder.addCase(getAllProductsOnSaleThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.saleProducts = action.payload;
    });

    builder.addCase(getOneProductThunk.pending, pendingCase);
    builder.addCase(getOneProductThunk.rejected, rejectedCase);
    builder.addCase(getOneProductThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.selectedProduct = action.payload;
    });

    builder.addCase(createProductThunk.pending, pendingCase);
    builder.addCase(createProductThunk.rejected, rejectedCase);
    builder.addCase(createProductThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.products.push(action.payload);
    });

    builder.addCase(updateProductThunk.pending, pendingCase);
    builder.addCase(updateProductThunk.rejected, rejectedCase);
    builder.addCase(updateProductThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      const index = state.products.findIndex(
        (product) => product._id === action.payload._id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    });

    builder.addCase(deleteProductThunk.pending, pendingCase);
    builder.addCase(deleteProductThunk.rejected, rejectedCase);
    builder.addCase(deleteProductThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.products = state.products.filter(
        (product) => product._id !== action.payload._id
      );
    });

    builder.addCase(getAllProductsThunk.pending, pendingCase);
    builder.addCase(getAllProductsThunk.rejected, rejectedCase);
    builder.addCase(getAllProductsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.products = action.payload;
    });
  },
});

export const { updateFilter, resetFilters, setPage, clearFilterError } =
  productsSlice.actions;
export default productsSlice.reducer;
