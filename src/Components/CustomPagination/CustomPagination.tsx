import Pagination from "@mui/material/Pagination";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/hooks";
import { handlePageNumber } from "../../ReduxToolkit/movieSlice";
import "./custompagination.css";
import Input from "@mui/joy/Input";
import Box from "@mui/joy/Box";

import { useState } from "react";
import Button from "@mui/material/Button";

interface Props {
  isDiscoverMovie: boolean;
}

const CustomPagination: React.FC<Props> = ({ isDiscoverMovie }) => {
  const totalPages = useAppSelector((state) => state.movies.totalPages);
  const totalPagesNumber = isDiscoverMovie ? 500 : totalPages;
  const currentPages = useAppSelector((state) => state.movies.pageNumber);
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<number>(currentPages);

  const handleChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ): void => {
    setCurrentPage(page);
    dispatch(handlePageNumber(page));
  };

  const handlePageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value }: { value: any } = event.target;
    value <= totalPagesNumber && setCurrentPage(value);
  };

  const handleGoToClick = (): void => {
    dispatch(handlePageNumber(currentPage));
  };

  return (
    <div className="pagination">
      <div className="pagination__buttons">
        <Pagination
          count={totalPagesNumber}
          onChange={handleChange}
          color="primary"
          hideNextButton
          hidePrevButton
        />
      </div>
      <div className="paginaton__input">
        <Box
          sx={{
            py: 2,
            display: "grid",
            gap: 2,
            alignItems: "center",
            flexWrap: "wrap",
            color: "white",
          }}
        >
          <Input
            type="phone"
            value={currentPage}
            onChange={(e) => handlePageChange(e)}
            endDecorator={
              <Button
                variant="contained"
                onClick={handleGoToClick}
                //loading={data.status === 'loading'}
                type="submit"
                sx={{
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5,
                  left: 11,
                }}
              >
                Go To
              </Button>
            }
          />
        </Box>
      </div>
    </div>
  );
};

export default CustomPagination;
