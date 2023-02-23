import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { fetchAsyncMovies } from "./apiCall";

interface MovieState {
  movie: Array<any>;
}

const initialState: MovieState = {
  movie: [],
};

export const counterSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    increment: (state) => {
      console.log(state + "incerement");
    },
    decrement: (state) => {
      console.log(state);
    },
    fetchMovies: (state, action: PayloadAction<any>) => {
      state.movie = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncMovies.pending, () => {
      console.log("pending");
    });
    builder.addCase(fetchAsyncMovies.fulfilled, (state, { payload }) => {
      return { ...state, movie: payload };
    });
    builder.addCase(fetchAsyncMovies.rejected, () => {
      console.log("rejected");
    });
  },
});

export const { increment, decrement, fetchMovies } = counterSlice.actions;
export const selectCount = (state: RootState) => state.movies.movie;
export default counterSlice.reducer;
