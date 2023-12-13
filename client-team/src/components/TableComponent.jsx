import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function TableComponent({ users }) {
  return (
    <div className="table">
      <table className="table table-bordered table-hover ">
        <thead className="thead-warning">
          <tr>
            <th>Email</th>
            <th>Number</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.email}</td>
              <td>{user.number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableComponent;
