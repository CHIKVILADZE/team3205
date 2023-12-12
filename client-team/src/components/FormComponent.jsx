import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import axios from 'axios';

function FormComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');

  const onSubmit = (data) => {
    console.log(data);

    // Perform a GET request using Axios
    axios
      .get(
        `http://localhost:5000/search/${data.email}?number=${data.number || ''}`
      )
      .then((response) => {
        console.log('GET request response:', response.data);
        // Use response data to update email and number states
        setEmail(response.data.email || '');
        setNumber(response.data.number || '');
      })
      .catch((error) => {
        console.error('Error making GET request:', error);
        // Handle errors here
      });
  };

  return (
    <div
      className="container mt-5 d-flex flex-column align-items-center rounded-4 text-white bg-info p-3"
      style={{ width: '400px' }}
    >
      <h1>FormComponent</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            placeholder="name@example.com"
            {...register('email', { required: true })}
            style={{ width: '300px' }}
            value={email} // Controlled input value
            onChange={(e) => setEmail(e.target.value)} // Update state on change
          />
          {errors.email && <p style={{ color: 'red' }}>Email is required.</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="numberInput" className="form-label">
            Number (Optional)
          </label>
          <input
            type="text"
            className={`form-control no-arrow ${
              errors.number ? 'is-invalid' : ''
            }`}
            id="numberInput"
            placeholder="Enter a number"
            {...register('number', { pattern: /^\d{6}$/ })}
            style={{ width: '300px' }}
            value={number} // Controlled input value
            onChange={(e) => setNumber(e.target.value)} // Update state on change
          />
          {errors.number && (
            <p style={{ color: 'red' }}>Number should be exactly 6 digits.</p>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default FormComponent;
