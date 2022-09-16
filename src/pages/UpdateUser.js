import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const UpdateUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  useEffect(() => {
    axios.get(`/users/${id}`).then((res) => {
      setUser({
        first_name: res.data[0].first_name,
        last_name: res.data[0].last_name,
        email: res.data[0].email,
      });
    });
  }, [id]);

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const data = {
      first_name: user.first_name,
      last_name: user.last_name,
    };
    axios.post(`users/${id}`, data).then((res) => {
      swal("Updated", res.data.message, "success");
    });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 mt-5">
          <div className="card">
            <div className="card-header">
              <h4>Update Information</h4>
            </div>

            <div className="card-body">
              <form onSubmit={onFormSubmit}>
                <div className="input-group mb-3 rounded-pill">
                  <label htmlFor="first_name" className="input-group-text">
                    First Name
                  </label>
                  <input
                    className={`form-control `}
                    name="first_name"
                    id="first_name"
                    type="text"
                    onChange={onInputChange}
                    value={user.first_name}
                  />
                </div>
                <div className="input-group mb-3 rounded-pill">
                  <label htmlFor="last_name" className="input-group-text">
                    Last Name
                  </label>
                  <input
                    className={`form-control `}
                    name="last_name"
                    id="emlast_nameail"
                    type="text"
                    onChange={onInputChange}
                    value={user.last_name}
                  />
                </div>
                <div className="input-group mb-3 rounded-pill">
                  <label htmlFor="email" className="input-group-text">
                    Email
                  </label>
                  <input
                    className={`form-control `}
                    name="email"
                    id="email"
                    type="email"
                    value={user.email}
                    readOnly
                  />
                </div>

                <div className="input-group mb-3">
                  <input
                    type="submit"
                    value="Save"
                    className="btn btn-dark w-100"
                  ></input>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
