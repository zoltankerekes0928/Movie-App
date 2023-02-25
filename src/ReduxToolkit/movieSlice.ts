import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
//import type { RootState } from "./store";
import { fetchAsyncMovies } from "./apiCall";

interface MovieState {
  movie: Array<any>;
  totalPages: number;
  pageNumber: number;
}

const initialState: MovieState = {
  movie: [],
  totalPages: 0,
  pageNumber: 1,
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    handlePageNumber: (state, action: PayloadAction<number>) => {
      state.pageNumber = action.payload;
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
      return {
        ...state,
        movie: payload?.results.results,
        totalPages: payload?.totalPages,
      };
    });
    builder.addCase(fetchAsyncMovies.rejected, () => {
      console.log("rejected");
    });
  },
});

export const { handlePageNumber, decrement, fetchMovies } = movieSlice.actions;
//export const selectMovie = (state: RootState) => state.movies.movie;
export default movieSlice.reducer;
