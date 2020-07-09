import React, { useState } from 'react';
import Tooltip from '../components/Tooltip/Tooltip';
import { StyleSheet, css } from '../aphrodite';
import { successColor, separatorColor, defaultColor, themeStyles } from '../theme';
import check from './assets/check.svg';

const styles = StyleSheet.create({
  checkboxWrapper: {
    width: '40px',
    height: '44px',
    background: 'white',
    display: 'flex',
    justifyContent: 'center',
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
  buttonWrapper: {
    display: 'inline-block',
    position: 'relative',
    margin: '0px 20px',
  },
  button: {
    backgroundColor: successColor,
    border: 'none',
    color: 'white',
    padding: '10px 10px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 2px',
    cursor: 'pointer',
  },
  containerWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '200px',
    height: '180px',
  },
  label: {
    width: '40px',
    height: '44px',
  },
  inputContainer: { width: '30%' },
  input: { width: '100%' },
});

const TooltipExample = () => {
  const [active, setActive] = useState(false);
  const [tooltipText, setTooltipText] = useState('Checkbox Tooltip');

  const tooltipTextOnChange = (e) => {
    setTooltipText(e.target.value);
  };

  return (
    <div>
      <div className={css(styles.containerWrapper, styles.title, themeStyles.defaultFont)}>
        <div className={css(styles.container)}>
          <p>Top Tooltip</p>
          <div className={css(styles.checkboxWrapper)}>
            <Tooltip tooltipText={tooltipText} tooltipSide="top" isShowing={active}>
              <div className={css(styles.checkbox, styles.active)} />
            </Tooltip>
          </div>
        </div>

        <div className={css(styles.container)}>
          <p>Right Tooltip</p>
          <div className={css(styles.checkboxWrapper)}>
            <Tooltip tooltipText={tooltipText} tooltipSide="right" isShowing={active}>
              <div className={css(styles.checkbox, styles.active)} />
            </Tooltip>
          </div>
        </div>

        <div className={css(styles.container)}>
          <p>Bottom Tooltip</p>
          <div className={css(styles.checkboxWrapper)}>
            <Tooltip tooltipText={tooltipText} tooltipSide="bottom" isShowing={active}>
              <div className={css(styles.checkbox, styles.active)} />
            </Tooltip>
          </div>
        </div>

        <div className={css(styles.container)}>
          <p>Left Tooltip</p>
          <div className={css(styles.checkboxWrapper)}>
            <Tooltip tooltipText={tooltipText} tooltipSide="left" isShowing={active}>
              <div className={css(styles.checkbox, styles.active)} />
            </Tooltip>
          </div>
        </div>
      </div>


      <div className={css(styles.containerWrapper, styles.title, themeStyles.defaultFont)}>
        <p>Click to activate all tooltip above</p>
        <div className={css(styles.buttonWrapper)}>
          <Tooltip tooltipText="Activate All Tooltip" tooltipSide="top">
            <button
              type="button"
              className={css(styles.button)}
              onClick={() => setActive(!active)}
            >
              Activate
            </button>
          </Tooltip>
        </div>
      </div>
      <div
        className={
          css(
            styles.containerWrapper,
            styles.title,
            themeStyles.defaultFont,
            styles.inputContainer,
          )
        }
      >
        <p>Set tooltip for all checkboxes</p>
        <Tooltip tooltipText="Max word length=20" tooltipSide="right">
          <input
            className={css(styles.input)}
            type="text"
            name="tooltip"
            id="tooltip"
            onChange={tooltipTextOnChange}
          />
        </Tooltip>
      </div>


    </div>
  );
};

export default TooltipExample;
