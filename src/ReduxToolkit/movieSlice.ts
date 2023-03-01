import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
//import type { RootState } from "./store";
import { fetchAsyncFilters, fetchAsyncMovies } from "./apiCall";

interface MovieState {
  movie: Array<any>;
  totalPages: number;
  pageNumber: number;
  filters: Array<{ id: string; name: string }>;
  selectedFilters: any;
  genres: Array<number>;
}

const initialState: MovieState = {
  movie: [],
  totalPages: 0,
  pageNumber: 1,
  filters: [],
  selectedFilters: [],
  genres: [],
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    handlePageNumber: (state, action: PayloadAction<number>) => {
      state.pageNumber = action.payload;
    },
    resetFilters: (
      state,
      action: PayloadAction<Array<{ id: string; name: string }>>
    ) => {
      state.filters = action.payload;
    },

    handleSelectedFilters: (
      state,
      action: PayloadAction<Array<{ id: string; name: string }>>
    ) => {
      state.selectedFilters = action.payload;
    },
    handleFilterListChange: (
      state,
      action: PayloadAction<Array<{ id: string; name: string }>>
    ) => {
      state.filters = action.payload;
    },
    fetchMovies: (
      state,
      action: PayloadAction<Array<{ id: string; name: string }>>
    ) => {
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

    builder.addCase(fetchAsyncFilters.fulfilled, (state, { payload }) => {
      return {
        ...state,
        filters: payload.genres,
      };
    });

    builder.addCase(fetchAsyncMovies.rejected, () => {
      console.log("rejected");
    });
  },
});

export const {
  handlePageNumber,
  fetchMovies,
  resetFilters,
  handleSelectedFilters,
  handleFilterListChange,
} = movieSlice.actions;
//export const selectMovie = (state: RootState) => state.movies.movie;
export default movieSlice.reducer;
