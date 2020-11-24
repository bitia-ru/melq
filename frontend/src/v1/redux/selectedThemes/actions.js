import acts from './acts';

export const setSelectedThemesIds = themesIds => ({
  type: acts.SET_SELECTED_THEMES_IDS,
  themesIds,
});

export default setSelectedThemesIds;
