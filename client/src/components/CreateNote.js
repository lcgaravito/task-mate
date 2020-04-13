/* eslint-disable react/prop-types */
import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class CreateNote extends Component {
  state = {
    users: [],
    userSelected: "",
    title: "",
    content: "",
    date: new Date(),
    toEdit: false,
    _id: "",
  };
  componentDidMount = async () => {
    const res = await axios.get("/api/users");
    this.setState({
      users: res.data.map((user) => user.username),
      userSelected: res.data[0] ? res.data[0].username : "",
    });
    if (this.props.match.params.id) {
      const res = await axios.get("/api/notes/" + this.props.match.params.id);
      this.setState({
        title: res.data.title,
        content: res.data.content,
        date: new Date(res.data.date),
        userSelected: res.data.author,
        toEdit: true,
        _id: this.props.match.params.id,
      });
    }
  };
  onSubmit = async (e) => {
    e.preventDefault();
    const newNote = {
      title: this.state.title,
      content: this.state.content,
      date: this.state.date,
      author: this.state.userSelected,
    };
    if (this.state.toEdit) {
      await axios.put("/api/notes/" + this.state._id, newNote);
    } else {
      await axios.post("/api/notes", newNote);
    }
    this.props.history.push("/");
  };
  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onDateChange = (date) => {
    this.setState({
      date,
    });
  };
  render() {
    return (
      <div className="col-md-6 offset-md-3">
        <div className="card card-body">
          {this.state.toEdit ? <h3>Edit a note</h3> : <h3>Create a note</h3>}
          {/** SELECT USER */}
          <div className="form-group">
            <select
              className="form-control"
              name="userSelected"
              onChange={this.onInputChange}
              value={this.state.userSelected}
            >
              {this.state.users.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              name="title"
              onChange={this.onInputChange}
              value={this.state.title}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              name="content"
              className="form-control"
              placeholder="Content"
              onChange={this.onInputChange}
              value={this.state.content}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <DatePicker
              className="form-control"
              selected={this.state.date}
              onChange={this.onDateChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
          </div>
          <form onSubmit={this.onSubmit}>
            <button type="submit" className="btn btn-primary">
              Save Note
            </button>
          </form>
        </div>
      </div>
    );
  }
}
