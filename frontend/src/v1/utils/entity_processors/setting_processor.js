import acts from '@/v1/redux/settings/acts';

const settingProcessor = (dispatch, setting) => {
  dispatch({
    type: acts.LOAD_SETTINGS_SUCCESS,
    setting,
  });
};

export default settingProcessor;
