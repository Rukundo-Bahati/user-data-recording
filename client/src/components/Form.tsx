import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    position: "",
    businessArena: "",
    employees: "",
    streetNr: "",
    additionalInfo: "",
    zipCode: "",
    place: "",
    country: "",
    code: "",
    phoneNumber: "",
    email: "",
    termsAccepted: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5110/api/users", formData);
      navigate("/fetch-data"); // Redirect to FetchData page upon successful submission
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="bg-light p-4">
      <div className="container p-4 pt-6">
        <div className="row shadow-lg rounded p-3">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="d-flex flex-wrap">
              <div className="col-md-6 mb-3">
                <div className="bg-white rounded p-4">
                  <h2 className="text-lg font-bold mb-4 text-center text-dark">
                    General Information
                  </h2>
                  <select
                    name="title"
                    className="form-select block w-full p-2 text-sm text-dark border border-gray-300 rounded mb-3"
                    value={formData.title}
                    onChange={handleChange}
                    aria-label="Title"
                  >
                    <option value="">Title</option>
                    <option value="Manager">Manager</option>
                    <option value="CEO">CEO</option>
                    <option value="Accountant">Accountant</option>
                  </select>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="firstName"
                      className="form-control block w-full p-2 text-sm text-dark border border-gray-300 rounded mb-3"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="lastName"
                      className="form-control block w-full p-2 text-sm text-dark border border-gray-300 rounded mb-3"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                  <select
                    name="position"
                    className="form-select block w-full p-2 text-sm text-dark border border-gray-300 rounded mb-3"
                    value={formData.position}
                    onChange={handleChange}
                    aria-label="Position"
                  >
                    <option value="">Position</option>
                    <option value="Lower">Lower</option>
                    <option value="Middle">Middle</option>
                    <option value="Upper">Upper</option>
                  </select>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="businessArena"
                      className="form-control block w-full p-2 text-sm text-dark border border-gray-300 rounded mb-3"
                      placeholder="Business Arena"
                      value={formData.businessArena}
                      onChange={handleChange}
                    />
                  </div>
                  <select
                    name="employees"
                    className="form-select block w-full p-2 text-sm text-dark border border-gray-300 rounded mb-3"
                    value={formData.employees}
                    onChange={handleChange}
                    aria-label="Employees"
                  >
                    <option value="">Employees</option>
                    <option value="<50">&lt;50</option>
                    <option value="<100">&lt;100</option>
                    <option value="Above 500">Above 500</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="text-white bg-primary rounded p-4">
                  <h2 className="text-lg font-bold mb-4 text-center">
                    Contact Details
                  </h2>
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="streetNr"
                      className="form-control block w-full p-2 text-sm text-white placeholder-white bg-primary border-bottom border-gray-300 focus:border-transparent focus:outline-none rounded mb-3"
                      placeholder="Street * Nr"
                      value={formData.streetNr}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name="additionalInfo"
                      className="form-control block w-full p-2 text-sm text-white placeholder-white bg-primary border-bottom border-gray-300 focus:border-transparent focus:outline-none rounded mb-3"
                      placeholder="Additional Information"
                      value={formData.additionalInfo}
                      onChange={handleChange}
                    />
                    <div className="row g-3">
                      <div className="col">
                        <input
                          type="text"
                          name="zipCode"
                          className="form-control block w-full p-2 text-sm text-white placeholder-white bg-primary border-bottom border-gray-300 focus:border-transparent focus:outline-none rounded mb-3"
                          placeholder="Zip Code"
                          value={formData.zipCode}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col">
                        <select
                          name="place"
                          className="form-select block w-full p-2 text-sm text-white placeholder-white bg-primary border-bottom border-gray-300 focus:border-transparent focus:outline-none rounded mb-3"
                          value={formData.place}
                          onChange={handleChange}
                          aria-label="Place"
                        >
                          <option value="">Place</option>
                          <option value="USA">USA</option>
                          <option value="Africa">Africa</option>
                          <option value="Asia">Asia</option>
                        </select>
                      </div>
                    </div>
                    <select
                      name="country"
                      className="form-select block w-full p-2 text-sm text-white placeholder-white bg-primary border-bottom border-gray-300 focus:border-transparent focus:outline-none rounded mb-3"
                      value={formData.country}
                      onChange={handleChange}
                      aria-label="Country"
                    >
                      <option value="">Country</option>
                      <option value="Rwanda">Rwanda</option>
                      <option value="Tanzania">Tanzania</option>
                      <option value="Kenya">Kenya</option>
                    </select>
                    <div className="row g-3">
                      <div className="col">
                        <input
                          type="number"
                          name="code"
                          className="form-control block w-full p-2 text-sm text-white placeholder-white bg-primary border-bottom border-gray-300 focus:border-transparent focus:outline-none rounded mb-3"
                          placeholder="Code *"
                          value={formData.code}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col">
                        <input
                          type="number"
                          name="phoneNumber"
                          className="form-control block w-full p-2 text-sm text-white placeholder-white bg-primary border-bottom border-gray-300 focus:border-transparent focus:outline-none rounded mb-3"
                          placeholder="Phone Number"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <input
                      type="email"
                      name="email"
                      className="form-control block w-full p-2 text-sm text-white placeholder-white bg-primary border-bottom border-gray-300 focus:border-transparent focus:outline-none rounded mb-3"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <div className="form-check">
                      <input
                        type="checkbox"
                        name="termsAccepted"
                        className="form-check-input"
                        id="check"
                        checked={formData.termsAccepted}
                        onChange={handleChange}
                      />
                      <label
                        className="form-check-label text-sm text-white"
                        htmlFor="check"
                      >
                        I do accept{" "}
                        <a href="#" className="text-white">
                          Terms and Conditions
                        </a>{" "}
                        of your site
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary bg-white text-primary border-primary py-2 px-4 rounded-3xl hover:bg-purple-700 hover:text-white hover:shadow-lg"
                    >
                      Register Badge
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
