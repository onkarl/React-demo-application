export const registerStudent = (data) => dispatch => {
  let students = JSON.parse(localStorage.getItem('students')) || [];
  students = [...students, data];
  localStorage.setItem('students', JSON.stringify(students));
  return dispatch({
    type: 'REGISTER_STUDENT',
    payload: data
  });
}

export const removeStudents = (data) => dispatch => {
  localStorage.setItem('students', JSON.stringify(data));
  return dispatch({
    type: 'REMOVE_STUDENT',
    payload: data
  });
}

export const updateStudent = (data, students) => dispatch => {
  const updatedStudents = students.map(student => student.id !== data.id ? student : data);
  localStorage.setItem('students', JSON.stringify(students));
  return dispatch ({
    type: 'UPDATE_STUDENT',
    payload: updatedStudents
  })
}