import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddExtension = ({closeModal}) => {
  const [FullNames, setFullname] = useState("");
  const [Department, setDepartment] = useState("");
  const [Extension, setExtension] = useState("");
  const navigate = useNavigate();

  const handleAddExtension = (e) => {
    const optn = {
      FullNames: FullNames,
      Department: Department,
      Extension: Extension,
    };
    if (!FullNames || !Department || !Extension) {
      toast.error("There is a missing field!!!")
    } else {
      axios.post("http://localhost:8080/extensions", optn).then(() => {
        navigate("/Admin/Dashboard");
        toast.success("Extension added successfully!!!")
      });
    }
  };

  return (
    <div>
      <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">
                      Create A new Extension
                    </h5>
                    <p className="text-center small">Provide all Details - MTRH Extension </p>
                  </div>

                  <form className="row g-3 needs-validation" novalidate>
                    <div className="col-12">
                      <label for="yourName" className="form-label">
                        Full Names
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setFullname(e.target.value)}
                      />
                    </div>

                    <div className="col-12">
                      <label for="yourEmail" className="form-label">
                        Department
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setDepartment(e.target.value)}
                        
                      />
                    </div>

                    <div className="col-12">
                      <label for="yourUsername" className="form-label">
                        Extension
                      </label>
                      <div className="input-group has-validation">
                        <input
                          type="number"
                          className="form-control"
                          onChange={(e) => setExtension(e.target.value)}
                          
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <button id="createBtn" onClick={handleAddExtension} className="btn btn-primary w-100">
                        Create Extension
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar={false}
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

export default AddExtension;
