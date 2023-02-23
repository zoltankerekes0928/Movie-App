import React from 'react'
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';


import './style.css'

const Header: React.FC = () => {
  return (
    <div className="header">
      <h1>Tv series, Movies</h1>
      <LocalMoviesIcon style={{color: "white"}} />
    </div>
   
   
  )
}

export default Header