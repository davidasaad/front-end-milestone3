import React, { useState, useEffect } from 'react';
import "./App.css";
import { Link } from 'react-router-dom'


function Customer() {
  const [Customer, setCustomer] = useState([]);
  const [selected, setSelected] = useState(null);

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showReturnPopup, setShowReturnPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [filmId, setFilmId] = useState("");

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editForm, setEditForm] = useState({ first_name: "", last_name: "", email: "", address: "",  city: "",
    district: "", postal_code: "", phone: "" });
  const [message, setMessage] = useState("");

  const [showAddPopup, setShowAddPopup] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ first_name: "", last_name: "", email: "", address: "",  city: "",
     country: "", district: "", postal_code: "", phone: ""});
 

  useEffect(() => {
    fetch("/Allcustomers")
      .then(response => response.json())
      .then(data => setCustomer(data))
      .catch(err => console.log(err));
  }, []);

  const clicked = (index) => {
    setSelected(selected === index ? null : index);
  };


  const openAddPopup = () => {
    setShowAddPopup(true);
    setMessage("");
  };


  const openDeletePopup = (customer) => {
    setSelectedCustomer(customer);
    setShowDeletePopup(true);
    setMessage("");
  };

  const openReturnPopup = (customer) => {
    setSelectedCustomer(customer);
    setShowReturnPopup(true);
    setMessage("");
  };

  const openEditPopup = (customer) => {
    setSelectedCustomer(customer);
    setEditForm({ first_name: customer.first_name, last_name: customer.last_name, email: customer.email,  
                address: customer.address, city: customer.city, country: customer.country, district: customer.district, 
                postal_code: customer.postal_code, phone: customer.phone
    });
    setShowEditPopup(true);
    setMessage("");
  };

  const closePopup = () => {
    setShowDeletePopup(false);
    setShowEditPopup(false);
    setShowReturnPopup(false);
    setSelectedCustomer(null);
    setShowAddPopup(false);
  };


  const handleDelete = () => {
    fetch("/deletecustomer", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({action: "delete",customer_id: selectedCustomer.customer_id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setMessage(data.error);
        }
        else{
          setMessage(data.message);
        }

      })   
  };

    const handleEdit = () => {
      fetch("/Allcustomers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_id: selectedCustomer.customer_id,
          first_name: editForm.first_name,
          last_name: editForm.last_name,
          email: editForm.email,
          address: editForm.address,
          city: editForm.city,
          district: editForm.district,
          postal_code: editForm.postal_code,
          phone: editForm.phone,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setMessage(data.error);
          }
          else{
            setMessage(data.message);
          }
        })
    };




    const handleAddCustomer = () => {
      fetch("/addcustomer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCustomer),
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setMessage(data.error);
        }
        else{
          setMessage(data.message);
        }
      })
    };

    const handleReturnRental = () => {
      fetch("/returnrental", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_id: selectedCustomer.customer_id,
          film_id: filmId,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setMessage(data.error);
          } else {
            setMessage(data.message);
          }
        })
    };
    

  return (
    <div>
      <div>
      <h1>
        Sakila Movies By David
        <li className='right'>
        <Link className='Link' to="/"> <button>Home</button></Link>
        <Link className='Link' to="/films"> <button>Films</button></Link>
        <Link className='Link' to="/customers"><button>Customers</button></Link>
        </li>
      </h1>
        <h2 className="Customers">Customers List</h2>
        <button className='addcutomer' onClick={openAddPopup}>Add Customer</button>
        <ul>
          {Customer.map((Customer, index) => (
            <li key={Customer.customer_id || `customer-${index}`}>
              <button className='movies_list' onClick={() => clicked(index)}>
                {Customer.first_name}, {Customer.last_name}
                <p>Customer ID: {Customer.customer_id}</p>
                <p>Active Rental: {Customer.active_rentals}</p>
              </button>
              {selected === index && (
                <div className="Customer_Detials">
                  <p>Email: {Customer.email}</p>
                  <p>Rentals Count History: {Customer.Count}</p>
                  <p>Address: {Customer.address}</p>
                  <p>City: {Customer.city}</p>
                  <p>Country: {Customer.country}</p>
                  <p>District: {Customer.district}</p>
                  <p>Postal Code: {Customer.postal_code}</p>
                  <p>Phone Number: {Customer.phone}</p>
                  <p>Create Date: {Customer.create_Date}</p>

                  <button className='edit-option' onClick={() => openEditPopup(Customer)}>Edit</button>
                  <button className='delete-option' onClick={() => openDeletePopup(Customer)}>Delete</button> 
                  <button className='delete-option' onClick={() => openReturnPopup(Customer)}>Return Rented Film</button> 
                </div>
              )}
            </li>
          ))}
        </ul>

        {showAddPopup &&(
          <div className="popup">
          <div className="popup-content">
            <h2>Add New Customer</h2>
            <input
              type="text"
              placeholder="First Name"
              value={newCustomer.first_name}
              onChange={(e) => setNewCustomer({ ...newCustomer, first_name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={newCustomer.last_name}
              onChange={(e) => setNewCustomer({ ...newCustomer, last_name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={newCustomer.email}
              onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
            />
            <input
              type="text"
              placeholder="Address"
              value={newCustomer.address}
              onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
            />
            <input
              type="text"
              placeholder="City"
              value={newCustomer.city}
              onChange={(e) => setNewCustomer({ ...newCustomer, city: e.target.value })}
            />
            <input
              type="text"
              placeholder="Country"
              value={newCustomer.country}
              onChange={(e) => setNewCustomer({ ...newCustomer, country: e.target.value })}
            />
            <input
              type="text"
              placeholder="District"
              value={newCustomer.district}
              onChange={(e) => setNewCustomer({ ...newCustomer, district: e.target.value })}
            />
            <input
              type="text"
              placeholder="Postal Code"
              value={newCustomer.postal_code}
              onChange={(e) => setNewCustomer({ ...newCustomer, postal_code: e.target.value })}
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={newCustomer.phone}
              onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
            />
            <button className="confirm" onClick={handleAddCustomer}>Add Customer</button>
            <button className="close" onClick={closePopup}>Cancel</button>
            {message && <p>{message}</p>}
          </div>
        </div>         
        )
        }
        {showReturnPopup && selectedCustomer && (
            <div className="popup">
              <div className="popup-content">
                <h2>Return Rental</h2>
                <p>Are you sure you want to return the rented movie for {selectedCustomer.first_name}?</p>
                <input
                  type="text"
                  placeholder="Enter Film ID"
                  value={filmId}
                  onChange={(e) => setFilmId(e.target.value)}
                />
                <button className="confirm" onClick={handleReturnRental}>Confirm</button>
                <button className="close" onClick={closePopup}>Cancel</button>
                {message && <p>{message}</p>}
              </div>
            </div>
          )}

        {showDeletePopup && selectedCustomer && (
        <div className="popup">
          <div className="popup-content">
            <h2>Are you sure you want to delete {selectedCustomer.first_name}?</h2>
            <button className="confirm" onClick={handleDelete}>Confirm</button>
            <button className="close" onClick={closePopup}>Cancel</button>
            {message && <p>{message}</p>}
          </div>
        </div>
      )}


      {showEditPopup && selectedCustomer && (
        <div className="popup">
          <div className="popup-content">
            <h2>Edit Customer</h2>
            <input
              type="text"
              placeholder="First Name"
              value={editForm.first_name}
              onChange={(e) => setEditForm({ ...editForm, first_name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={editForm.last_name}
              onChange={(e) => setEditForm({ ...editForm, last_name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={editForm.email}
              onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
            />


            <input
              type="text"
              placeholder="Address"
              value={editForm.address}
              onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
            />
            <input
              type="text"
              placeholder="City"
              value={editForm.city}
              onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
            />
            <input
              type="text"
              placeholder="District"
              value={editForm.district}
              onChange={(e) => setEditForm({ ...editForm, district: e.target.value })}
            />
            <input
              type="text"
              placeholder="Postal Code"
              value={editForm.postal_code}
              onChange={(e) => setEditForm({ ...editForm, postal_code: e.target.value })}
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={editForm.phone}
              onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
            />



            <button className="confirm" onClick={handleEdit}>Save Changes</button>
            <button className="close" onClick={closePopup}>Cancel</button>
            {message && <p>{message}</p>}
          </div>
        </div>
      )}


      </div>
    </div>
  );
}

export default Customer;