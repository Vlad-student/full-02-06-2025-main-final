import axios from "axios";
import queryString from "query-string";
import CONSTANTS from "../constants";

const apiClient = axios.create({
  baseURL: CONSTANTS.BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// orders
export const createOrder = (values) => apiClient.post("/orders", values);
export const createCheckoutSession = (id, products) =>
  apiClient.post("/orders/create-checkout-session", { id, products });
export const updateOrderStatus = (id, status) =>
  apiClient.patch(`/orders/${id}`, { status });
//http://localhost:3000/orders?page=2&amount=4   options = {page:1, amount:2}
export const getOrdersForAdmin = (options) => {
  const query = queryString.stringify(options); //page=1&amount=2
  return apiClient.get(`/orders?${query}`);
};
export const getOrdersAmount = () => apiClient.get("/orders/countAllOrders");
export const getAccountOrders = () => apiClient.get("/orders/account");
export const getOrderById = (id) => apiClient.get(`/orders/${id}`);

//auth
export const registerUser = (values) =>
  apiClient.post("/users/register", values);
export const loginUser = (values) => apiClient.post("/users/login", values);
export const getAccount = () => apiClient.get("/users/account");
export const updateUser = (id, values) =>
  apiClient.patch(`/users/${id}`, values);

// categories
export const getAllCategories = () => apiClient.get("/categories");
export const getOneCategory = (id) => apiClient.get(`/categories/${id}`);
export const createCategory = (values) => apiClient.post("/categories", values);
export const updateCategory = (id, values) =>
  apiClient.patch(`/categories/${id}`, values);
export const deleteCategory = (id) => apiClient.delete(`/categories/${id}`);

// products
export const getFilteredProducts = (filters = {}) => {
  const queryParams = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== "" &&
      value !== null &&
      value !== false
    ) {
      queryParams.append(key, value.toString());
    }
  });
  return apiClient.get(`/products/filtered?${queryParams.toString()}`);
};

export const getCategoriesForFilter = () => {
  return apiClient.get("/products/filter/categories");
};

export const getSearchProducts = (options) => {
  const query = queryString.stringify(options);
  return apiClient.get(`/products/search?${query}`);
};

export const getAllProducts = (options) => {
  const query = queryString.stringify(options);
  return apiClient.get(`/products?${query}`);
};
export const getOneProduct = (id) => apiClient.get(`/products/${id}`);

export const getProductsOnSale = () => {
  return apiClient.get("/products/sale");
};

export const getAdminStats = () => {
  return apiClient.get("/admin/stats");
};

export const createProduct = (values) => apiClient.post("/products", values);
export const updateProduct = (id, values) =>
  apiClient.patch(`/products/${id}`, values);
export const deleteProduct = (id) => apiClient.delete(`/products/${id}`);

// const API_URL = "/api/products";
// export const getSearchProducts = async (query) => {
//   const response = await axios.get(
//     `${API_URL}/search?q=${encodeURIComponent(query)}`
//   );
//   return response;
// };

// export const getSearchProducts = (query) => {
//   return apiClient.get(`/products/search?q=${query}`);
// };

// export const searchProduct = (query) => {
//   return apiClient.get(`/products/search?q=${encodeURIComponent(query)}`);
// };
