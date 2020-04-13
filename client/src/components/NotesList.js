import React, { Component } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

export default class NotesList extends Component {
  state = {
    notes: [],
  };
  componentDidMount() {
    this.getNotes();
  }
  getNotes = async () => {
    const res = await axios.get("/api/notes");
    this.setState({
      notes: res.data,
    });
  };
  onDeleteClick = async (id) => {
    await axios.delete("/api/notes/" + id);
    this.getNotes();
  };
  render() {
    return (
      <div>
        <div className="text-center m-4">
          <Link
            type="button"
            className="btn btn-outline-light btn-lg"
            to="/create"
          >
            Create a Task!
          </Link>
        </div>
        <div className="row">
          {this.state.notes.map((note) => (
            <div className="col-md-4 p-2" key={note._id}>
              <div className="card">
                <div className="card-header d-flex justify-content-between">
                  <h5> {note.title} </h5>
                  <Link className="btn btn-secondary" to={"edit/" + note._id}>
                    Edit
                  </Link>
                </div>
                <div className="card-body">
                  <p> {note.content} </p> <p> Author: {note.author} </p>
                  <p> Date: {format(note.date)} </p>
                </div>
                <div className="card-footer">
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => this.onDeleteClick(note._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
