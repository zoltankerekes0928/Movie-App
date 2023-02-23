import React from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Nav from "./Components/Nav/Nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import { Main } from "./Components/Main/Main";
import TvSeries from "./Components/TvSeries/TvSeries";
import Search from "./Components/Search/Search";
import Favorites from "./Components/Favorites/Favorites";
import Movies from "./Components/Movies/Movies";
import { store } from "./ReduxToolkit/store";
import { Provider } from "react-redux";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Provider store={store}>
        <div className="App">
          <Container>
            <Routes>
              <Route path="/" index element={<Main />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/tvseries" element={<TvSeries />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </Container>
        </div>
      </Provider>
      <Nav />
    </BrowserRouter>
  );
}

export default App;
