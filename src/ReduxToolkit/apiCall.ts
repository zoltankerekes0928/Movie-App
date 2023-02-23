import { createAsyncThunk } from "@reduxjs/toolkit";

export const API_KEY = "5f7ffdf39f3872487aa6e59a9a6938c1";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (data: string) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/${data}?api_key=${API_KEY}`
    );
    if (response.ok) {
      const movies = await response.json();
      const data = await movies.results;

      return data;
    } else {
      console.log("Fail");
    }
  }
);
