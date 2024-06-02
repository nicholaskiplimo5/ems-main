import React from "react";
import { Link } from "react-router-dom";
const Paginate = (props) => {
  const { postPerPage, totalPosts, currentPage, prevPage, nextPage } =
    props;

  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination justify-content-end">
      {currentPage !== 0 && (
        <li className="page-item">
          <Link className="page-link text-white bg-success" onClick={() => prevPage()}>
            Prev
          </Link>
        </li>
      )}
      
        <li className="page-item">
          <Link className="page-link bg-success text-success disable">
            -------
          </Link>
        </li>
      
      {pageNumbers.length !== currentPage && (
        <li className="page-item">
          <Link className="page-link bg-success text-white" onClick={() => nextPage()}>
            Next
          </Link>
        </li>
      )}
    </ul>
  );
};

export default Paginate;
