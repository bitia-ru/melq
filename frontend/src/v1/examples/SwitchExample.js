import React, { useState } from 'react';
import Switch from '@/v1/components/Switch/Switch';
import { StyleSheet, css } from '../aphrodite';
import { disabledBtnColor } from '../theme';

const styles = StyleSheet.create({
  switchWrapper: {
    display: 'flex',
    width: '200px',
    height: '60px',
    justifyContent: 'center',
    margin: 'auto 20px',
    border: `1px solid ${disabledBtnColor}`,
  },
  btnWrapper: { margin: '5px 20px' },
});

const SwitchExample = () => {
  const [checked, setChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const onClick = (bool) => {
    setChecked(!bool);
  };

  const disableSwitch = () => {
    setDisabled(!disabled);
  };

  return (
    <div>
      <div className={css(styles.switchWrapper)}>
        <Switch
          id="SwitchID"
          disabled={disabled}
          checked={checked}
          onClick={onClick}
          name="Switch name"
          tooltipText="Switch tooltip"
          tooltipSide="bottom"
        />
      </div>
      <div className={css(styles.btnWrapper)}>
        <input
          type="button"
          value="Click"
          name="disabled"
          id="inputDisabled"
          onClick={disableSwitch}
        />
        <span>Перевести switch в disabled</span>
      </div>
    </div>
  );
};

export default SwitchExample;
