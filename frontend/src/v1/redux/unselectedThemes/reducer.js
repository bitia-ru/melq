import acts from './acts';

const unselectedThemesIdsReducer = (state = [], action) => {
  switch (action.type) {
  case acts.SET_UNSELECTED_THEMES_IDS:
    return action.themesIds;
  default:
    return state;
  }
};

export default unselectedThemesIdsReducer;
