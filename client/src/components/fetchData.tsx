import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link for navigation

const FetchData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null); // State to track which user is being edited
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
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5110/api/users");
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5110/api/users/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleEdit = (id) => {
    setEditingId(id); // Set the id of the user being edited
    // Fetch user data based on id and populate formData for editing
    const user = data.find((user) => user._id === id);
    if (user) {
      setFormData({
        title: user.title,
        firstName: user.firstName,
        lastName: user.lastName,
        position: user.position,
        businessArena: user.businessArena,
        employees: user.employees,
        streetNr: user.streetNr,
        additionalInfo: user.additionalInfo,
        zipCode: user.zipCode,
        place: user.place,
        country: user.country,
        code: user.code,
        phoneNumber: user.phoneNumber,
        email: user.email,
      });
    }
  };

  const cancelEdit = () => {
    setEditingId(null); // Clear editing state to cancel editing
    // Clear formData
    setFormData({
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
    });
  };

  const updateUser = async (id, updatedData) => {
    try {
      await axios.put(`http://localhost:5110/api/users/${id}`, updatedData);
      setEditingId(null); // Clear editing state after successful update
      fetchData(); // Refresh the data after update
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>User Data</h2>
        {/* Use Link component to navigate to the form */}
        <Link to="/" className="btn btn-primary">
          Add User
        </Link>
      </div>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Position</th>
            <th>Business Arena</th>
            <th>Employees</th>
            <th>Street Nr</th>
            <th>Additional Info</th>
            <th>Zip Code</th>
            <th>Place</th>
            <th>Country</th>
            <th>Code</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user._id}>
              <td>{user.title}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.position}</td>
              <td>{user.businessArena}</td>
              <td>{user.employees}</td>
              <td>{user.streetNr}</td>
              <td>{user.additionalInfo}</td>
              <td>{user.zipCode}</td>
              <td>{user.place}</td>
              <td>{user.country}</td>
              <td>{user.code}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.email}</td>
              <td className="d-flex flex-column">
                {editingId === user._id ? (
                  <>
                    <button
                      className="btn btn-success btn-sm mb-2"
                      onClick={() => updateUser(user._id, formData)}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={cancelEdit}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-primary btn-sm mb-2"
                      onClick={() => handleEdit(user._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FetchData;
