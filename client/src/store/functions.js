export const pendingCase = (state) => {
  state.isLoading = true;
  state.error = null;
};

export const rejectedCase = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};
