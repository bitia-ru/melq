import React from 'react';
import Tooltip from '../components/Tooltip/Tooltip';
import { StyleSheet, css } from '../aphrodite';
import { successColor, separatorColor } from '../theme';
import check from './assets/check.svg';

const styles = StyleSheet.create({
  wrapper: {
    display: 'inline-block',
    position: 'relative',
    width: '40px',
    height: '44px',
    background: 'white',
    margin: '10px 50px',
    textAlign: 'center',
    ':hover': { '>span': { visibility: 'visible' } },
  },
  checkbox: {
    width: '24px',
    height: '24px',
    margin: '0px 8px',
    background: separatorColor,
    borderRadius: '3px',
  },
  svg: { margin: '7px 5px 8px 6px' },
  active: {
    background: successColor,
    backgroundImage: `url(${check})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% 50%',
  },
});

const TooltipExample = () => (
  <>
    <div className={css(styles.wrapper)}>
      <div>V1</div>
      <div
        className={css(
          styles.checkbox,
          styles.active,
        )}
      />
      <Tooltip tooltipText="Checkbox#1" />
    </div>
    <div className={css(styles.wrapper)}>
      <div>V2</div>
      <div
        className={css(
          styles.checkbox,
          styles.active,
        )}
      />
      <Tooltip tooltipText="Checkbox#2" />
    </div>
    <div className={css(styles.wrapper)}>
      <div>V3</div>
      <div
        className={css(
          styles.checkbox,
          styles.active,
        )}
      />
      <Tooltip tooltipText="Checkbox#3" />
    </div>
    <div className={css(styles.wrapper)}>
      <div>V4</div>
      <div
        className={css(
          styles.checkbox,
          styles.active,
        )}
      />
      <Tooltip tooltipText="Checkbox#4" />
    </div>
  </>
);

export default TooltipExample;
