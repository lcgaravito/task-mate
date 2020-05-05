import React, { Component } from "react";
import axios from "axios";
import "./Home.css";
import { Link } from "react-router-dom";
import Login from "./Login";

export default class Home extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    this.getUser();
  }
  getUser = async () => {
    const res = await axios.get("/passport/getUser");
    this.setState({
      user: res.data,
    });
  };
  onLogout = () => {
    fetch("/passport/logout")
      .then((res) => res.json())
      .then((res) => {
        if (res.ok) {
          this.setState({
            user: null,
          });
        } else {
          console.log("Error in logout");
        }
      });
  };
  render() {
    return (
      <div className="container m-4">
        {!this.state.user ? (
          <Login />
        ) : (
          <div>
            Welcome {this.state.user.username}
            <button onClick={this.onLogout}>Logout</button>
          </div>
        )}
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
