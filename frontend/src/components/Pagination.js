import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = (props) => {
  return (
    <div role="navigation" aria-label="Pagination Navigation">
      <ReactPaginate
        pageCount={Math.ceil(props.totalPosts / props.postsPerPage)}
        pageRangeDisplayed={10}
        marginPagesDisplayed={10}
        onPageChange={props.handlePageClick}
        containerClassName="paginate-container"
        previousClassName="paginate-previous"
        nextClassName="paginate-next"
        pageClassName="paginate-page"
        pageLinkClassName="pagination-a"
        activeClassName="paginate-active"
        disabledClassName="paginate-disabled"
      ></ReactPaginate>
    </div>
  );
};

export default Pagination;
