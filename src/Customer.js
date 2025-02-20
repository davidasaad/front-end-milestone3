import React, { useState, useEffect } from 'react';
import "./App.css";
import { Link } from 'react-router-dom'


function Customer() {
  const [Customer, setCustomer] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch("/Allcustomers")
      .then(response => response.json())
      .then(data => setCustomer(data))
      .catch(err => console.log(err));
  }, []);

  const clicked = (index) => {
    setSelected(selected === index ? null : index);
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
        <ul>
          {Customer.map((Customer, index) => (
            <li key={Customer.customer_id || `customer-${index}`}>
              <button onClick={() => clicked(index)}>
                {Customer.first_name}, {Customer.last_name}
              </button>
              {selected === index && (
                <div className="Customer_Detials">
                  <p>Email: {Customer.email}</p>
                  <p>Rentals Count History: {Customer.Count}</p>
                  <p>Active Rental: {Customer.active}</p>
                  <p>Customer ID: {Customer.customer_id}</p>
                  <p>Create Date: {Customer.create_Date}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Customer;