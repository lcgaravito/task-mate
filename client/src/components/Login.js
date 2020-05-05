import React from "react";
// import PropTypes from 'prop-types'

const Login = (props) => {
  return (
    <div className="login">
      <div className="card">
        <form action="/passport/login" method="post">
          <div>
            <label>Username:</label>
            <input type="text" name="username" />
            <br />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" />
          </div>
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

// Login.propTypes = {}

export default Login;
