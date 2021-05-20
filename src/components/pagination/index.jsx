import React from "react";
import ReactPaginate from "react-paginate";
import "./styles.scss";

const Pagination = ({ pageCount = 3, onPageChange }) => {
  return (
    <div>
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default Pagination;
