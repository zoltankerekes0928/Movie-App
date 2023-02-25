import React from "react";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../ReduxToolkit/hooks";
import { fetchAsyncMovies } from "../../ReduxToolkit/apiCall";
import SingleComponent from "../SingleContent/SingleContent";
import "./main.css";
import CustomPagination from "../CustomPagination/CustomPagination";

export const Main: React.FC = () => {
  const movies = useAppSelector((state) => state.movies.movie);
  const pages = useAppSelector((state) => state.movies.pageNumber);

  const dispatch = useAppDispatch();
  // const [page, setPage]=useState<number>(pages)

  const movieType = "trending/all/day";
  interface Movies {
    movieType: string;
    pages: number;
  }

  const dataToFetch: Movies = {
    movieType: movieType,
    pages: pages,
  };

  useEffect(() => {
    dispatch(fetchAsyncMovies(dataToFetch));
    window.scroll(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, pages]);

  return (
    <div className="main">
      <h2 className="main__title">Trending Movies</h2>
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
      <CustomPagination />
    </div>
  );
};
