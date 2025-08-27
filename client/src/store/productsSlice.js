import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getOneProduct,
} from '../api';
import { pendingCase, rejectedCase } from './functions';

export const getOneProductThunk = createAsyncThunk(
  'products/getOneProductThunk',
  async (id, thunkAPI) => {
    try {
      const response = await getOneProduct(id);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const getAllProductsThunk = createAsyncThunk(
  'products/getAllProductsThunk',
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
  'products/createProductThunk',
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
  'products/updateProductThunk',
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
  'products/deleteProductThunk',
  async (id, thunkAPI) => {
    try {
      const response = await deleteProduct(id);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    error: null,
    isLoading: false,
    selectedProduct: null,
  },
  reducers: {},
  extraReducers: (builder) => {
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

export default productsSlice.reducer;
