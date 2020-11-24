import acts from './acts';

export const setUnselectedThemesIds = themesIds => ({
  type: acts.SET_UNSELECTED_THEMES_IDS,
  themesIds,
});

export default setUnselectedThemesIds;
