import React from "react";
import { img_300 } from "../../config";
import unavailable from "../../Assets/unavailable.jpg";
import "./singleContent.css";
import { Badge } from "@mui/material";

interface Movie {
  id: string;
  poster: string;
  title: string;
  date: string;
  media_type: string;
  vote_average: number;
}

const SingleContent: React.FC<Movie> = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  return (
    <div className="movie">
      {!!vote_average && (
        <Badge
          badgeContent={vote_average.toFixed(1)}
          color={vote_average.toFixed(1) >= "8.5" ? "primary" : "secondary"}
        />
      )}
      <img
        className="movie__poster"
        src={poster ? `${img_300}/${poster}` : unavailable}
        alt={`poster of the ${title}`}
      />
      <b className="movie__title">{title}</b>
      <span className="movie__details">
        {media_type === "tv" ? "Tv Series" : "Movie"}
        <span className="movie__release">{date}</span>
      </span>
    </div>
  );
};

export default SingleContent;
