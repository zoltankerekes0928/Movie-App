import { createAsyncThunk } from "@reduxjs/toolkit";

export const API_KEY = "5f7ffdf39f3872487aa6e59a9a6938c1";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ movieType, pages }: { movieType: string; pages: number }) => {
    const response = await fetch(
      //`https://api.themoviedb.org/3/${movieType}?api_key=${API_KEY}&page=${pages}?`
      `https://api.themoviedb.org/3/${movieType}?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pages}&with_watch_monetization_types=flatrate`
    );
    if (response.ok) {
      const movies = await response.json();
      const totalPages = await movies.total_pages;
      const results = await movies;
      
      return { results, totalPages };
    } else {
      console.log("Fail");
    }
  }
);

/*
const handleFetch = (type, page)=>{ 
  fetchAsyncMovies(type, page)
}
*/
