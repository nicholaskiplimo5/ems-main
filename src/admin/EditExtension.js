import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  FullNames: "",
  Department: "",
  Extension: "",
};

const EditExtension = () => {
  const [state, setState] = useState(initialState);

  const { FullNames, Department, Extension } = state;

  const { id } = useParams();

  const navigate = useNavigate();


  useEffect(() => {
    const fetchSingleExtension = async () => {
      const res=await axios.get(`http://localhost:8080/extensions/${id}`)
      setState(res.data);
    };
    fetchSingleExtension();
  }, [id]);

  const handleUpdate = () => {
    const res=axios
      .put(`http://localhost:8080/extensions/${id}`, {
        FullNames,
        Department,
        Extension,
      })
      .then(() => {
        setState({ FullNames: "", Department: "", Extension: "" });
      })
      .catch((error) => toast.error(error.response.data));
      toast.success(res.data.message);
      navigate('/Admin/Dashboard')
  };

  const handleChange = (e) => {
    const { name, value } = e.target
    setState({ ...state, [name]: value });
  };

  return (
    <div className="container">

<section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">
                      Update Extension new Extension
                    </h5>
                    <p className="text-center small">Provide all Details - MTRH Extension </p>
                  </div>

                  <form className="row g-3 needs-validation" onSubmit={handleUpdate}>
                    <div className="col-12">
                      <label for="yourName" className="form-label">
                        Full Names
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="FullNames"
                        name="FullNames"
                        value={FullNames||""}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label for="yourEmail" className="form-label">
                        Department
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="Department"
                        name="Department"
                        value={Department||""}  
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label for="yourUsername" className="form-label">
                        Extension
                      </label>
                      <div className="input-group has-validation">
                        <input
                          type="number"
                          id="Extension"
                          className="form-control"
                          name="Extension"
                          value={Extension||""}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn-primary w-100">
                        Save Changed
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>   
    </div>
  );
};

export default EditExtension;
