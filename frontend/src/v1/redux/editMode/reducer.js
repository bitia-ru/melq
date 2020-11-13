import acts from './acts';

const editModeReducer = (state = false, action) => {
  switch (action.type) {
  case acts.SET_EDIT_MODE:
    return action.editMode;
  default:
    return state;
  }
};

export default editModeReducer;
