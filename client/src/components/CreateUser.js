import React, { Component } from "react";
import axios from "axios";

export default class CreateUser extends Component {
  state = {
    users: [],
    username: "",
  };
  async componentDidMount() {
    this.getUsers();
  }
  getUsers = async () => {
    const res = await axios.get("/api/users");
    console.log(res.data);
    this.setState({ users: res.data });
  };
  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };
  onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/users", {
      username: this.state.username,
    });
    this.getUsers();
    this.setState({
      username: "",
    });
  };
  deleteUser = async (id) => {
    await axios.delete("/api/users/" + id);
    this.getUsers();
  };
  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <div className="card card-body">
            <h3> Create new user </h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-8">
          <ul className="list-group mt-4">
            {this.state.users.map((user) => (
              <li
                className="list-group-item list-group-item-action"
                key={user._id}
                onDoubleClick={() => this.deleteUser(user._id)}
              >
                {user.username.username}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
