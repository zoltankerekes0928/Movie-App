import React from "react";

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
  return <div>SingleContent</div>;
};

export default SingleContent;
