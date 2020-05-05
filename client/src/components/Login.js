import React from "react";
// import PropTypes from 'prop-types'

const Login = (props) => {
  return (
    <div className="login">
      <div className="card">
        <form action="/passport/login" method="post">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="password"
            />
          </div>
          <div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Login.propTypes = {}

export default Login;
