import React, { useState } from 'react';
import CheckBox from '../components/CheckBox/CheckBox';
import { StyleSheet, css } from '../aphrodite';
import { themeStyles } from '../theme';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '300px',
    height: '60px',
    alignItems: 'center',
    margin: 'auto 20px',
  },
  span: { margin: '0px 10px' },
});

const CheckBoxExample = () => {
  const [checkedDefaultCheckbox, setCheckedDefaultCheckbox] = useState(false);
  const [checkedSmallCheckbox, setCheckedSmallCheckbox] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const onClickDefaultCheckbox = (bool) => {
    setCheckedDefaultCheckbox(!bool);
  };
  const onClickSmallCheckbox = (bool) => {
    setCheckedSmallCheckbox(!bool);
  };

  const disableCheckbox = () => {
    setDisabled(!disabled);
  };

  return (
    <div className={css(themeStyles.defaultFont)}>
      <div className={css(styles.container)}>
        <CheckBox
          id="default_checkbox"
          disabled={disabled}
          checked={checkedDefaultCheckbox}
          onClick={onClickDefaultCheckbox}
          name="default_checkbox"
          tooltipText="Default checkbox"
          tooltipSide="right"
        />
        <span className={css(styles.label)}>Default Checkbox</span>
      </div>
      <div className={css(styles.container)}>
        <CheckBox
          id="small_checkbox"
          disabled={disabled}
          checked={checkedSmallCheckbox}
          onClick={onClickSmallCheckbox}
          name="small_checkbox"
          size="small"
          tooltipText="Small checkbox"
          tooltipSide="right"
        />
        <span className={css(styles.label)}>Small Checkbox</span>
      </div>
      <input
        type="button"
        value="Click"
        name="disabled"
        id="inputDisabled"
        onClick={disableCheckbox}
      />
      <span>Перевести чекбоксы в disabled</span>
    </div>

  );
};

export default CheckBoxExample;
