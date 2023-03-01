import React, { useEffect } from "react";
import { handleFetchMovies } from "../../ReduxToolkit/apiCall";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/hooks";
import CustomPagination from "../CustomPagination/CustomPagination";
import SingleComponent from "../SingleContent/SingleContent";
import Filter from "../Filter/Filter";
import { getGenres } from "../../Hooks/getGenres";

const TvSeries: React.FC = () => {
  const movies = useAppSelector((state) => state.movies.movie);
  const pages = useAppSelector((state) => state.movies.pageNumber);
  const selectedFilter = useAppSelector(
    (state) => state.movies.selectedFilters
  );
  const dispatch = useAppDispatch();

  const movieType = "discover/tv";
  interface Series {
    movieType: string;
    pages: number;
    genres: Array<number>;
  }

  const dataToFetch: Series = {
    movieType: movieType,
    pages: pages,
    genres: getGenres(selectedFilter),
  };

  useEffect(() => {
    dispatch(handleFetchMovies(dataToFetch));
    window.scroll(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, pages, selectedFilter]);

  return (
    <div className="main">
      <h2 className="main__title">Discover Series</h2>
      <Filter filterType="tv" />
      <div className="main__container">
        {movies &&
          movies.map((movie: any) => (
            <SingleComponent
              key={movie.id}
              id={movie.id}
              poster={movie.poster_path}
              title={movie.title || movie.name}
              date={movie.first_air_date || movie.release_date}
              media_type={movie.media_type}
              vote_average={movie.vote_average}
            />
          ))}
      </div>
      <CustomPagination isDiscoverMovie />
    </div>
  );
};

export default TvSeries;
