import { createAsyncThunk } from "@reduxjs/toolkit";

export const API_KEY = "5f7ffdf39f3872487aa6e59a9a6938c1";

interface MoviesData {
  movieType:  string,
  pages: number,
  genres?: Array<number>, 
}

interface FilterData{
  filterType: string,
  pages: number,
}

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ movieType, pages, genres }: MoviesData) => {
    const response = await fetch(
      //`https://api.themoviedb.org/3/${movieType}?api_key=${API_KEY}&page=${pages}?`
      `https://api.themoviedb.org/3/${movieType}?api_key=${API_KEY}&with_genres=${genres}?&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pages}&with_watch_monetization_types=flatrate`
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

export const fetchAsyncFilters = createAsyncThunk(
  "movies/fetchFilters",
  async ({ filterType, pages}: FilterData) => {
    const response = await fetch(
      //`https://api.themoviedb.org/3/${movieType}?api_key=${API_KEY}&page=${pages}?`
     // `https://api.themoviedb.org/3/genre/${filterType}/list?api_key=${API_KEY}&language=en-US`
     `https://api.themoviedb.org/3/genre/${filterType}/list?api_key=5f7ffdf39f3872487aa6e59a9a6938c1&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_watch_monetization_types=flatrate`
    );
    if (response.ok) {
      const data = await response.json();
      const genres = await data
      return  genres ;
    } else {
      console.log("Fail");
    }
  }
);

export const handleFetchFilters = ({filterType, pages}: FilterData)=>{
  return fetchAsyncFilters({filterType, pages})
}

export const handleFetchMovies = ({movieType, pages, genres}:MoviesData)=>{ 
  return fetchAsyncMovies({movieType, pages, genres})
}

