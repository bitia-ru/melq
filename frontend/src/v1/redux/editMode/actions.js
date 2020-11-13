import acts from './acts';

export const setEditMode = editMode => ({
  type: acts.SET_EDIT_MODE,
  editMode,
});

export default setEditMode;
