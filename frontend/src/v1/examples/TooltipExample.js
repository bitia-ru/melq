import React from 'react';
import Tooltip from '../components/Tooltip/Tooltip';
import { StyleSheet, css } from '../aphrodite';
import {
  successColor,
  separatorColor,
  defaultColor,
  themeStyles,
  focusBgColor,
  focusBorderColor,
  mainFontColor,
  bgColor,
  selectedItemColor,
} from '../theme';
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
  title: { color: defaultColor },

  tooltipCheckboxOne: {
    backgroundColor: focusBgColor,
    color: defaultColor,
    border: `1px solid ${focusBorderColor}`,
    ':before': {
      borderColor: `transparent transparent ${focusBgColor} transparent`,
      borderBottomColor: focusBorderColor,
    },
    ':after': { borderColor: `transparent transparent ${focusBgColor} transparent` },
  },

  tooltipCheckboxTwo: {
    backgroundColor: mainFontColor,
    color: bgColor,
    border: `1px solid ${mainFontColor}`,
    ':before': {
      borderColor: `transparent transparent ${mainFontColor} transparent`,
      borderBottomColor: mainFontColor,
    },
    ':after': { borderColor: `transparent transparent ${mainFontColor} transparent` },
  },

  tooltipCheckboxThree: {
    backgroundColor: selectedItemColor,
    color: mainFontColor,
    border: `1px solid ${selectedItemColor}`,
    ':before': {
      borderColor: `transparent transparent ${selectedItemColor} transparent`,
      borderBottomColor: selectedItemColor,
    },
    ':after': { borderColor: `transparent transparent ${selectedItemColor} transparent` },
  },

  tooltipCheckboxFour: {
    backgroundColor: separatorColor,
    color: mainFontColor,
    border: `1px solid ${separatorColor}`,
    ':before': {
      borderColor: `transparent transparent ${separatorColor} transparent`,
      borderBottomColor: separatorColor,
    },
    ':after': { borderColor: `transparent transparent ${separatorColor} transparent` },
  },
});

const TooltipExample = () => (
  <>
    <div className={css(styles.wrapper)}>
      <div className={css(styles.title, themeStyles.defaultFont)}>V1</div>
      <div className={css(styles.checkbox, styles.active)} />
      <Tooltip
        tooltipText="Checkbox#1 Tooltip"
        tooltipStyles={styles.tooltipCheckboxOne}
      />
    </div>

    <div className={css(styles.wrapper)}>
      <div className={css(styles.title, themeStyles.defaultFont)}>V2</div>
      <div className={css(styles.checkbox, styles.active)} />
      <Tooltip tooltipText="Checkbox#2 Tooltip" tooltipStyles={styles.tooltipCheckboxTwo} />
    </div>

    <div className={css(styles.wrapper)}>
      <div className={css(styles.title, themeStyles.defaultFont)}>V3</div>
      <div className={css(styles.checkbox, styles.active)} />
      <Tooltip tooltipText="Checkbox#3 Tooltip" tooltipStyles={styles.tooltipCheckboxThree} />
    </div>

    <div className={css(styles.wrapper)}>
      <div className={css(styles.title, themeStyles.defaultFont)}>V4</div>
      <div className={css(styles.checkbox, styles.active)} />
      <Tooltip tooltipText="Checkbox#4 Tooltip" tooltipStyles={styles.tooltipCheckboxFour} />
    </div>

    <div className={css(styles.wrapper)}>
      <div>Send</div>
      <Tooltip tooltipText="Tooltip" tooltipStyles={styles.tooltipCheckboxFour} />
    </div>

    <div className={css(styles.wrapper)}>
      <a href="">Link</a>
      <Tooltip tooltipText="Tooltip" tooltipStyles={styles.tooltipCheckboxFour} />
    </div>
  </>
);

export default TooltipExample;
