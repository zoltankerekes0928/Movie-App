import React, { useEffect } from "react";
import CustomPagination from "../CustomPagination/CustomPagination";
import SingleComponent from "../SingleContent/SingleContent";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/hooks";
import { handleFetchMovies } from "../../ReduxToolkit/apiCall";
import Filter from "../Filter/Filter";
import { getGenres } from '../../Hooks/getGenres';
import { handlePageNumber } from "../../ReduxToolkit/movieSlice";

export const Movies: React.FC = () => {
  const movies = useAppSelector((state) => state.movies.movie);
  const pages = useAppSelector((state) => state.movies.pageNumber);
  const selectedFilter = useAppSelector((state) => state.movies.selectedFilters)

  const dispatch = useAppDispatch();
  // const [page, setPage]=useState<number>(pages)

  const movieType = "discover/movie";
  
  interface Movies {
    movieType: string;
    pages: number;
    genres: Array<number>;
  }

  const dataToFetch: Movies = {
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
      <h2 className="main__title">Discover Movies</h2>
      <Filter filterType="movie"/>
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

export default Movies;
