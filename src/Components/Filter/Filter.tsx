/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/hooks";
import { handleFetchFilters } from "../../ReduxToolkit/apiCall";
import {
  handleFilterListChange,
  handleSelectedFilters,
  resetFilters,
} from "../../ReduxToolkit/movieSlice";
import Chip from "@mui/material/Chip";

interface Props {
  filterType: string;
}

const Filter: React.FC<Props> = ({ filterType }) => {
  const pages = useAppSelector((state) => state.movies.pageNumber);

  interface Filter {
    filterType: string;
    pages: number;
  }

  const filterToFetch: Filter = {
    filterType: filterType,
    pages: pages,
  };

  type Filters = {
    id: string;
    name: string;
  };

  const filters = useAppSelector((state) => state.movies.filters);
  const selectedFilters = useAppSelector(
    (state) => state.movies.selectedFilters
  );
  const dispatch = useAppDispatch();
  const [selectedGenres, setSelectedGenres] =
    useState<Array<Filters>>(selectedFilters);
  const [filterList, setFilterList] = useState<Array<Filters>>(filters);

  useEffect(() => {
    dispatch(handleFetchFilters(filterToFetch));
    return () => {
      resetFilters([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pages]);

  useEffect(() => {
    setFilterList(filters);
  }, [filters]);

  const addFilter = (filter: Filters) => {
    setSelectedGenres([...selectedGenres, filter]);
    setFilterList(filterList.filter((item) => item.id !== filter.id));
    handleFilterListChange(filterList);
  };

  const removeFilter = (selectedFilter: Filters) => {
    setSelectedGenres(
      selectedGenres.filter((item) => item.id !== selectedFilter.id)
    );
    setFilterList(
      [...filterList, selectedFilter].sort((a, b) => (a.name > b.name ? 1 : -1))
    );
  };

  useEffect(() => {
    dispatch(handleSelectedFilters(selectedGenres));
    dispatch(handleFilterListChange(filterList));
  }, [selectedGenres]);

  return (
    <>
      <div>
        {selectedFilters &&
          selectedFilters.map((selectedFilter: Filters) => (
            <Chip
              color="primary"
              clickable
              key={selectedFilter.id}
              style={{ margin: 2 }}
              label={selectedFilter.name}
              onDelete={() => removeFilter(selectedFilter)}
            />
          ))}
      </div>
      <div>
        {filters &&
          filters.map((filter: Filters) => (
            <Chip
              color="primary"
              clickable
              key={filter.id}
              style={{ margin: 2 }}
              label={filter.name}
              onClick={() => addFilter(filter)}
            />
          ))}
      </div>
    </>
  );
};

export default Filter;
