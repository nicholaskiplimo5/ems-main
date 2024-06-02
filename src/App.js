import { Link } from "react-router-dom";
import Logo from "./image/mtrh.png";
import { InputGroup } from "react-bootstrap";
import { Form } from "react-bootstrap";
import Paginate from "./components/Paginate";
import axios from "axios";

import { useState, useEffect } from "react";
import Spinner from "./components/Spinner";
function App() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [extensions, setExtensions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [postPerPage] = useState(40);
  const [totalPosts, setTotalPosts] = useState(0);

  //fetch data from the Restful API
  useEffect(() => {
    const fetchExtensions = async () => {
      setLoading(true);
      const res = await axios.get("http://localhost:8080/extensions");
      setExtensions(res.data);
      setLoading(false);
      setTotalPosts(res.data.length);
    };
    fetchExtensions();
  }, []);

  const indexOfLastPost = currentPage + postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = extensions.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const prevPage = () => setCurrentPage(currentPage - 40);
  const nextPage = () => setCurrentPage(currentPage + 40);

  const showPagination = () => {
    return (
      <Paginate
        postPerPage={postPerPage}
        totalPosts={totalPosts}
        currentPage={currentPage}
        paginate={paginate}
        prevPage={prevPage}
        nextPage={nextPage}
      />
    );
  };

  return (
    <div className="container">
      <nav className="nav mtrh-nav">
        <div className="row">
          <div className="col mt-4">
            <img className="image-size" src={Logo} alt="" />
          </div>
          <div className="col d-flex justify-content-end mt-4">
            <Link className="nav-link " to={"./Administrator"}>
              Login
            </Link>
          </div>
        </div>
      </nav>
      <div className="mt-3">
        <h2>MTRH - Extensions System</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
          optio corrupti id, odio sequi rem corporis alias dolorem perferendis
          excepturi voluptatem, similique iure accusamus rerum. Recusandae
          repellendus eos voluptas et!
        </p>
      </div>
      <nav class="mt-3">
        <div>
          <form className="row">
            <div className="col-md-4">
              <InputGroup className="me-3">
                <Form.Control
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter by Name"
                />
              </InputGroup>
            </div>
            <div className="col-md-4"></div>
            <div className="col-md-4"></div>
          </form>
        </div>
      </nav>
      {loading ? (
        <Spinner />
      ) : (
        <table className="table table-striped hover mt-3">
          <thead className="table-info">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Department </th>
              <th>Extension </th>
            </tr>
          </thead>
          {extensions.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={8} className="text-center mb-0">
                  {" "}
                  No Data Found in the database
                </td>
              </tr>
            </tbody>
          ) : (
            currentPosts
              .filter((item) => {
                return search.toLocaleLowerCase() === ""
                  ? item
                  : item.FullNames.toLocaleLowerCase().includes(search);
              })
              .map((data) => (
                <tbody>
                  <tr key={data.id}>
                    <td>{data.id}</td>
                    <td>{data.FullNames}</td>
                    <td>{data.Department}</td>
                    <td>{data.Extension}</td>
                  </tr>
                </tbody>
              ))
          )}
        </table>
      )}
      {extensions.length === 0 ? (
        !showPagination()
      ) : (
        <nav aria-label="Page navigation">{showPagination()}</nav>
      )}
      <footer className="footer">
        <div className="container footer-content">
          <div>
            <p>&copy; Moi Teaching and Referral Hospital</p>
          </div>
          <div>
            <p>Powered by MTRH Innovation</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
