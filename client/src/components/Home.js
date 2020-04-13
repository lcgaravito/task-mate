import React, { Component } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

export default class Home extends Component {
  render() {
    return (
      <div className="container m-4">
        <div className="Welcome text-center">
          <img
            className="logo-image"
            src="/logo-transparente.png"
            alt="Check mark"
          />
          <h1>Task Mate</h1>
          <br />
          <h4>With "Task Mate" you can organize your daily tasks list</h4>
          <br />
          <Link
            type="button"
            className="btn btn-outline-light btn-lg"
            to="/notes"
          >
            Create a Task!
          </Link>
        </div>
      </div>
    );
  }
}
