import React from "react";
import { BsMenuApp, BsPencil, BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";
import { InputGroup, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { ToastContainer, toast } from "react-toastify";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [extension, setExtensions] = useState([]);

  useEffect(() => {
    const fetchExtensions = async () => {
      setLoading(true);
      const res = await axios.get("http://localhost:8080/extensions");
      setExtensions(res.data);
      setLoading(false);
    };
    fetchExtensions();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are your sure you want to delete the Extension!")) {
      axios.delete(`http://localhost:8080/extensions/${id}`);
      toast.success("Extension Deleted Successfully!!", {
        position: "bottom-right",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };
  return (
    <div className="container p-3 mt-3">
      <h3 className="text-orange">
        <BsMenuApp style={{ fill: "orange" }} /> Admin Control pannel
      </h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, tenetur!
      </p>
      <form className="row">
        <div className="col-md-6">
          <InputGroup className="me-3">
            <Form.Control
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by Name...."
            />
          </InputGroup>
        </div>
        <div className="col-md-6 d-flex justify-content-end">
          <button className="btn btn-success d-flex justify-content-end">
            <Link className="none text-white" to={"/Admin/AddNew"}>
              Add Extension
            </Link>
          </button>
        </div>
      </form>

      <table className="table table-striped hover mt-3">
        <thead className="table-info">
          <tr className="row">
            <th className="col-md-2">#</th>
            <th className="col-md-3">Name</th>
            <th className="col-md-3">Department </th>
            <th className="col-md-2">Extension </th>
            <th className="col-md-2 d-flex justify-content-end">Action</th>
          </tr>
        </thead>
        {extension.length === 0 ? (
          <tbody>
            <tr>
              <td colSpan={8} className="text-center mb-0">
                {" "}
                No Data Found in the database
              </td>
            </tr>
          </tbody>
        ) : (
          extension
          .filter((item) => {
            return search.toLocaleLowerCase() === ""
              ? item
              : item.FullNames.toLocaleLowerCase().includes(search);
          })
          
          .map((data) => (
            <tbody>
              <tr className="row">
              <td className="col-md-2">{data.id}</td>
              <td className="col-md-3">{data.FullNames}</td>
              <td className="col-md-3">{data.Department}</td>
              <td className="col-md-2">{data.Extension}</td>
              <td className="col-md-2 d-flex justify-content-end">
                  <button className="btn btn-success me-2">
                    <Link to={`/extension/edit/${data.id}`}>
                      <BsPencil style={{ fill: "white" }} />
                    </Link>
                  </button>
                  <button
                    onClick={() => handleDelete(data.id)}
                    className="btn btn-danger "
                  >
                    <BsTrash />
                  </button>
                </td>
              </tr>
            </tbody>
          ))
        )}
      </table>

      <ToastContainer
        position="bottom-right"
        autoClose={500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Dashboard;
