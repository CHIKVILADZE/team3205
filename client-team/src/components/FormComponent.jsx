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
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = (data) => {
    console.log(data);

    const requestData = {
      email: data.email,
      ...(data.number && { number: data.number }),
    };

    axios
      .get(`http://localhost:5000/search`, {
        params: requestData,
      })
      .then((response) => {
        console.log('GET request responsessssss:', response.data);
        if (response.data) {
          setErrorMessage('');
        }
      })
      .catch((error) => {
        console.error('Error making GET request:', error.response.data.error);
        setErrorMessage(error.response.data.error);
      });
  };

  return (
    <div
      className="container mt-5 d-flex flex-column align-items-center rounded-4 text-white bg-info p-3"
      style={{ width: '400px' }}
    >
      <h1>FormComponent</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errorMessage && <h3 className="text-danger">{errorMessage}</h3>}
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
