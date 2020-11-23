import * as R from 'ramda';
import acts from './acts';

const settingsReducer = (state = { settings: {} }, action) => {
  switch (action.type) {
  case acts.LOAD_SETTINGS_SUCCESS:
    if (action.setting) {
      return {
        settings: {
          ...state.settings,
          [action.setting.id]: action.setting,
        },
      };
    }
    return {
      settings: {
        ...state.settings,
        ...R.reduce((l, u) => ({ ...l, [u.id]: u }), {})(action.settings),
      },
    };
  default:
    return state;
  }
};

export default settingsReducer;
