import acts from './acts';

const selectedThemesIdsReducer = (state = [], action) => {
  switch (action.type) {
  case acts.SET_SELECTED_THEMES_IDS:
    return action.themesIds;
  default:
    return state;
  }
};

export default selectedThemesIdsReducer;
