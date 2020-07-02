import React from 'react';
import Tooltip from '../components/Tooltip/Tooltip';
import { StyleSheet, css } from '../aphrodite';
import { successColor, separatorColor, defaultColor, themeStyles } from '../theme';
import check from './assets/check.svg';

const styles = StyleSheet.create({
  checkboxWrapper: {
    display: 'inline-block',
    position: 'relative',
    width: '40px',
    height: '44px',
    background: 'white',
    margin: '10px 50px',
    textAlign: 'center',
    ':hover': { '>span': { visibility: 'visible' } },
  },
  buttonWrapper: {
    display: 'inline-block',
    position: 'relative',
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
  container: {
    display: 'flex',
    ':hover': { '>span': { visibility: 'visible' } },
  },
});

const TooltipExample = () => (
  <>
    <div className={css(styles.checkboxWrapper)}>
      <div className={css(styles.title, themeStyles.defaultFont)}>V1</div>
      <div className={css(styles.checkbox, styles.active)} />
      <Tooltip
        tooltipText="Checkbox#1 Tooltip"
        tooltipSide="bottom"
      />
    </div>

    <div className={css(styles.checkboxWrapper)}>
      <div className={css(styles.title, themeStyles.defaultFont)}>V2</div>
      <div className={css(styles.checkbox, styles.active)} />
      <Tooltip
        tooltipText="Checkbox#2 Tooltip"
        tooltipSide="bottom"
      />
    </div>

    <div className={css(styles.checkboxWrapper)}>
      <div className={css(styles.title, themeStyles.defaultFont)}>V3</div>
      <div className={css(styles.checkbox, styles.active)} />
      <Tooltip
        tooltipText="Checkbox#3 Tooltip"
        tooltipSide="bottom"
      />
    </div>

    <div className={css(styles.checkboxWrapper)}>
      <div className={css(styles.title, themeStyles.defaultFont)}>V4</div>
      <div className={css(styles.checkbox, styles.active)} />
      <Tooltip
        tooltipText="Checkbox#4 Tooltip"
        tooltipSide="bottom"
      />
    </div>

    <div className={css(styles.container)}>
      <div className={css(styles.checkboxWrapper)}>
        <div className={css(styles.checkbox, styles.active)} />
        <Tooltip
          tooltipText="Checkbox#4 Tooltip Tooltip Tooltip Tooltip Tooltip"
          tooltipSide="right"
        />
      </div>
    </div>

    <div className={css(styles.container)}>
      <div className={css(styles.buttonWrapper)}>
        <button>Send1</button>
        <Tooltip
          tooltipText="Tooltip"
          tooltipSide="bottom"
        />
      </div>
    </div>

    <div className={css(styles.container)}>
      <div className={css(styles.buttonWrapper)}>
        <button>Send2</button>
        <Tooltip
          tooltipText="Tooltip"
          tooltipSide="right"
        />
      </div>
    </div>

    <div className={css(styles.container)}>
      <div className={css(styles.buttonWrapper)}>
        <a href="">Link</a>
        <Tooltip
          tooltipText="Tooltip"
          tooltipSide="right"
        />
      </div>
    </div>

    <div className={css(styles.container)}>
      <div className={css(styles.buttonWrapper)}>
        <a href="">Link</a>
        <Tooltip
          tooltipText="Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip"
          tooltipSide="right"
        />
      </div>
    </div>
  </>
);

export default TooltipExample;
