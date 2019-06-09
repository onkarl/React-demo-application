const students = JSON.parse(localStorage.getItem('students')) || [];
export default (state = students, action) => {
  switch (action.type) {
    case 'REGISTER_STUDENT':
      return [
        ...state,
        action.payload
      ]
    case 'REMOVE_STUDENT':
      return action.payload
    case 'UPDATE_STUDENT':
      return action.payload
    default:
      return state;
  }
};