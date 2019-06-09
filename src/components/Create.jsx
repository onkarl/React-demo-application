import React, { Component } from 'react';
import { connect } from 'react-redux';

import { registerStudent, updateStudent } from '../actions';
import countries from '../data/countries';

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
      hobbies: [],
      country: '',
      validations: {
        email: {
          isInvalid: false,
          error: ''
        },
        password: {
          isInvalid: false,
          error: ''
        },
        confirmPassword: {
          isInvalid: false,
          error: ''
        },
        gender: {
          isInvalid: false,
          error: ''
        },
        hobbies: {
          isInvalid: false,
          error: ''
        },
        country: {
          isInvalid: false,
          error: ''
        }
      },
      isEdit: false,
      isRecordFonud:false
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeHobby = this.onChangeHobby.bind(this);
    this.onChangeCountry = this.onChangeCountry.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    const { students } = this.props;
    let student = {};
    if (id && (this.props.match.path).indexOf('/update/') === 0) {
      id = Number(id);
      student = students.filter((element) => element.id === id)[0];
      if (student) {
        this.setState({
          id: student.id,
          email: student.email,
          gender: student.gender,
          country: student.country,
          password: student.password,
          confirmPassword: student.confirmPassword,
          hobbies: student.hobbies,
          isEdit: true,
          isRecordFonud: true
        });
      }else {
        this.setState({
          isRecordFonud: false,
          isEdit: true
        })
      }
    }
  }

  onChangeEmail(e) {
    const email = e.target.value;
    const { validations } = this.state;
    if (email === '') {
      validations.email.isInvalid = true;
      validations.email.error = '*Required'
    } else {
      validations.email.isInvalid = false;
    }

    this.setState({
      email,
      validations
    });
  }

  onChangeGender(e) {
    const gender = e.target.value;
    const { validations } = this.state;
    if (gender === '') {
      validations.gender.isInvalid = true;
      validations.gender.error = '*Required'
    } else {
      validations.gender.isInvalid = false;
    }
    this.setState({
      gender,
      validations
    });
  }

  onChangeHobby(e) {
    let { hobbies } = this.state;
    const hobby = e.target.value;
    const isChecked = e.target.checked;
    if (isChecked) {
      hobbies.push(hobby);
    } else {
      hobbies = hobbies.filter((item) => item !== hobby);
    }
    const { validations } = this.state;
    if (hobbies.length === 0) {
      validations.hobbies.isInvalid = true;
      validations.hobbies.error = '*Required'
    } else {
      validations.hobbies.isInvalid = false;
    }
    this.setState({
      hobbies,
      validations
    });
  }

  onChangeCountry(e) {
    const country = e.target.value;
    const { validations } = this.state;
    if (country === '') {
      validations.country.isInvalid = true;
      validations.country.error = '*Required'
    } else {
      validations.country.isInvalid = false;
    }
    this.setState({
      country,
      validations
    });
  }

  onChangePassword(e) {
    const password = e.target.value;
    const { validations } = this.state;
    if (password === '') {
      validations.password.isInvalid = true;
      validations.password.error = '*Required'
    } else {
      validations.password.isInvalid = false;
    }
    this.setState({
      password,
      validations
    });
  }

  onChangeConfirmPassword(e) {
    const confirmPassword = e.target.value;
    const { validations } = this.state;
    if (confirmPassword === '') {
      validations.confirmPassword.isInvalid = true;
      validations.confirmPassword.error = '*Required'
    } else {
      validations.confirmPassword.isInvalid = false;
    }
    this.setState({
      confirmPassword,
      validations
    });

  }


  handleFormSubmit() {
    const { id, email, gender, hobbies, country, password, confirmPassword, validations, isEdit } = this.state;
    const { students } = this.props;
    let isFormValid = true;
    const regex = /^[a-z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/;
    if (email === '') {
      validations.email.isInvalid = true;
      validations.email.error = '*Required';
      isFormValid = false;
    } else {
      if (!regex.test(email)) {
        validations.email.isInvalid = true;
        validations.email.error = 'Please enter a valid email address!';
        isFormValid = false;
      } else {
        validations.email.isInvalid = false;
      }
    }
    if (gender == '') {
      validations.gender.isInvalid = true;
      validations.gender.error = '*Required';
      isFormValid = false;
    } else {
      validations.gender.isInvalid = false;
    }
    if (country == '') {
      validations.country.isInvalid = true;
      validations.country.error = '*Required';
      isFormValid = false;
    } else {
      validations.country.isInvalid = false;
    }

    if (hobbies.length === 0 || hobbies.length < 2) {
      validations.hobbies.isInvalid = true;
      validations.hobbies.error = 'Please select at least two hobbies';
      isFormValid = false;
    } else {
      validations.hobbies.isInvalid = false;
    }
    if (password == '') {
      validations.password.isInvalid = true;
      validations.password.error = '*Required';
      isFormValid = false;
    } else {
      validations.password.isInvalid = false;
    }
    if (confirmPassword === '') {
      validations.confirmPassword.isInvalid = true;
      validations.confirmPassword.error = '*Required';
      isFormValid = false;
    } else {
      if (confirmPassword !== password) {
        validations.confirmPassword.isInvalid = true;
        validations.confirmPassword.error = 'Confirm password does not match with password';
        isFormValid = false;
      } else {
        validations.confirmPassword.isInvalid = false;
      }
    }
    if (isFormValid) {
      const data = { id: isEdit ? id : students.length + 1, email: email, gender: gender, hobbies: hobbies, country: country, password: password, confirmPassword: confirmPassword };
      if (isEdit) {
        this.props.updateStudent(data, students);
        alert('Student successfully updated');
        this.props.history.push('/');
      } else {
        if (students.filter((student) => student.email === email).length === 0) {
          this.props.registerStudent(data);
          alert('Student successfully registered');
          this.props.history.push('/');
        } else {
          validations.email.isInvalid = true;
          validations.email.error = 'This email address is already registered';
          isFormValid = false;
        }
      }
    }
    this.setState({
      validations
    });
  }

  render() {
    const { gender, email, country, password, confirmPassword, validations, isEdit, isRecordFonud } = this.state;
    return (
      (isRecordFonud && isEdit || !isEdit) ? <div style={{ marginTop: 10 }}>
        {isEdit ? <h3>Update Student {email}</h3> : <h3>Add New Student</h3>}
        <form>
          <div className="form-group">
            <label>Email:  </label>
            <input
              type="text"
              className="form-control"
              value={email}
              onChange={this.onChangeEmail}
              disabled={isEdit}
            />
            {validations.email.isInvalid && <label className="text-danger" role="alert">
              {validations.email.error}
            </label>}
          </div>
          <div className="form-group">
            <label>Gender:  </label>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="gender" value="Male" checked={gender === 'Male'} onChange={this.onChangeGender} />
              <label className="form-check-label">
                Male
            </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="gender" value="Female" checked={gender === 'Female'} onChange={this.onChangeGender} />
              <label className="form-check-label">
                Female
            </label>
            </div>
            <div className="form-check disabled">
              <input className="form-check-input" type="radio" name="gender" value="Others" checked={gender === 'Others'} onChange={this.onChangeGender} />
              <label className="form-check-label">
                Others
            </label>
            </div>
            {validations.gender.isInvalid && <label className="text-danger" role="alert">
              {validations.gender.error}
            </label>}
          </div>
          <div className="from-group">
            <label>Hobbies:</label>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="Traveling" onChange={this.onChangeHobby} />
              <label className="form-check-label">
                Traveling
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="Music" onChange={this.onChangeHobby} />
              <label className="form-check-label">
                Music
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="Reading" onChange={this.onChangeHobby} />
              <label className="form-check-label">
                Reading
              </label>
            </div>
            {validations.hobbies.isInvalid && <label className="text-danger" role="alert">
              {validations.hobbies.error}
            </label>}
          </div>
          <div className="form-group">
            <label>Country:  </label>
            <select className="form-control" value={country} onChange={this.onChangeCountry}>
              <option value=''>Select a Country</option>
              {countries.map((country, idx) =>
                <option key={idx} value={country.name}>{country.name}</option>
              )}
            </select>
            {validations.country.isInvalid && <label className="text-danger" role="alert">
              {validations.country.error}
            </label>}
          </div>
          <div className="form-group">
            <label>Password:  </label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={this.onChangePassword}
            />
            {validations.password.isInvalid && <label className="text-danger" role="alert">
              {validations.password.error}
            </label>}
          </div>
          <div className="form-group">
            <label>Confirm Password:  </label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={this.onChangeConfirmPassword}
            />
            {validations.confirmPassword.isInvalid && <label className="text-danger" role="alert">
              {validations.confirmPassword.error}
            </label>}
          </div>
          <div className="form-group">
            <input type="button" value={isEdit ? 'Save' : 'Submit'} onClick={this.handleFormSubmit} className="btn btn-primary" />
          </div>
        </form>
      </div> : <div className="text-center">Student record does not exist ! click to <a href='/create'> here </a>create new record</div>
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
    registerStudent: data => dispatch(registerStudent(data)),
    updateStudent: (data, students) => dispatch(updateStudent(data, students))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);