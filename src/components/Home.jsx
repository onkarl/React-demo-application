import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { removeStudents } from '../actions';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStudents: []
    }
    this.handleSelectAll = this.handleSelectAll.bind(this);
    this.selectStudent = this.selectStudent.bind(this);
    this.removeSelected = this.removeSelected.bind(this);
  }

  handleSelectAll(e) {
    let { selectedStudents } = this.state;
    const { students } = this.props;
    const isChecked = e.target.checked;
    if (isChecked) {
      students.forEach(element => {
        selectedStudents.push(element.id);
      });
    } else {
      selectedStudents = [];
    }
    this.setState({
      selectedStudents
    });
  }

  selectStudent(e) {
    const isChecked = e.target.checked;
    const selectedStudent = Number(e.target.value);
    let { selectedStudents } = this.state;
    if (isChecked) {
      selectedStudents.push(selectedStudent);
    } else {
      selectedStudents = selectedStudents.filter((element) => element !== selectedStudent);
    }
    this.setState({
      selectedStudents
    });
  }

  removeSelected() {
    const { selectedStudents } = this.state;
    let { students } = this.props;
    students = students.filter((element) => !selectedStudents.includes(element.id));
    this.props.removeStudents(students);
    this.setState({
      selectedStudents: []
    });
  }
  render() {
    const { students } = this.props;
    const { selectedStudents } = this.state;
    return (
      <div className="container">
        <h2>Students List</h2>
        <div className="form-group"><Link to='/create' className="btn btn-primary">Add Student</Link>&nbsp;
          <button className="btn btn-primary" disabled={selectedStudents.length === 0 } onClick={this.removeSelected}>Remove Selected</button></div>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Email</th>
              <th scope="col">Gender</th>
              <th scope="col">Hobbies</th>
              <th scope="col">Country</th>
              <th scope="col">Password</th>
              <th scope="col">
                {students.length > 0 && <input className="form-check-input" type="checkbox" onChange={this.handleSelectAll} checked={students.length === selectedStudents.length} />}Select
              </th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length ? students.map((student, key) => {
              return (<tr key={key}>
                <td>{student.id}</td>
                <td>{student.email}</td>
                <td>{student.gender}</td>
                <td>{student.hobbies}</td>
                <td>{student.country}</td>
                <td>{student.password}</td>
                <td><input className="form-check-input" type="checkbox" value={student.id} checked={selectedStudents.includes(student.id)} onChange={this.selectStudent} /></td>
                <td><Link to={`/update/${student.id}`}> Edit </Link></td>

              </tr>)
            }) : <tr><td colSpan={6} className="text-center">No records available! :-(</td></tr>}
          </tbody>
        </table>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    students: state.studentReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeStudents: data => dispatch(removeStudents(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);