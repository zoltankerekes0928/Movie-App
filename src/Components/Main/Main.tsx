import React from "react";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../ReduxToolkit/hooks";
import { fetchAsyncMovies } from "../../ReduxToolkit/apiCall";
import SingleComponent from "../SingleContent/SingleContent";

export const Main = () => {
  const movies = useAppSelector((state) => state.movies.movie);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAsyncMovies("trending/all/day"));
  }, [dispatch]);

  console.log(movies);
  

  return (
    <div>
      <h2 className="trendingTitle">Trending Movies</h2>
      <div className="trending">
        {movies &&
          movies.map((movie: any) => (
            <SingleComponent 
              key={movie.id}
              id={movie.id}
              poster={movie.poster_path}
              title={movie.title || movie.name}
              date={movie.first_air_date || movie.release_date}
              media_type={movie.media_type}
              vote_average={movie.vote_average} />
          ))}
      </div>
    </div>
  );
};
