import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { StyleSheet, css } from '../../aphrodite';
import { themeStyles } from '@/v1/theme';
import Tooltip from '@/v1/components/Tooltip/Tooltip';
import ConditionalWrapper from '@/v1/utils/conditionalWrapper';

const mapIndexed = R.addIndex(R.map);

const styles = StyleSheet.create({
  container: { display: 'flex', flexDirection: 'row', flex: 1 },
  btn: {
    cursor: 'pointer',
    outlineOffset: 1,
    height: 44,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  btnDisabled: { cursor: 'not-allowed' },
  btnWaiting: { cursor: 'wait' },
  btnSmall: { height: 38 },
  btnBig: { height: 48 },
  withoutRightBorderRadius: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  withoutLeftBorderRadius: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
});

const getColorStyle = btnStyle => (
  themeStyles[`${btnStyle}Color`] || themeStyles.defaultColor
);

const getDisabledColorStyle = (btnStyle) => {
  switch (btnStyle) {
  case 'transparent':
    return themeStyles.transparentColorDisabled;
  case 'transparentWithBorder':
    return themeStyles.transparentWithBorderColorDisabled;
  case 'outlined':
    return themeStyles.transparentWithBorderColorDisabled;
  default:
    return themeStyles.defaultColorDisabled;
  }
};

const ButtonLayout = ({
  disabled,
  isWaiting,
  onClick,
  btnStyle,
  size,
  type,
  children,
  tooltipText,
  tooltipSide,
}) => {
  const mainContent = ({
    btnType,
    style,
    btnDisabled,
    btnIsWaiting,
    withoutRightBorderRadius,
    withoutLeftBorderRadius,
    bordered,
    child,
    btnOnClick,
    btnTooltipText,
    btnTooltipSide,
  }) => (
    <ConditionalWrapper
      condition={btnTooltipText}
      wrapper={
        content => (
          <Tooltip tooltipText={btnTooltipText} tooltipSide={btnTooltipSide}>
            {content}
          </Tooltip>
        )
      }
    >
      <button // eslint-disable-line react/button-has-type
        type={btnType || 'button'}
        onClick={btnDisabled || btnIsWaiting ? null : btnOnClick}
        tabIndex={0}
        disabled={!!btnDisabled}
        className={
          css(
            styles.btn,
            themeStyles.focusable,
            size === 'small' && styles.btnSmall,
            size === 'big' && styles.btnBig,
            themeStyles.defaultFont,
            themeStyles.fontWeight500,
            themeStyles.bordered,
            withoutRightBorderRadius && styles.withoutRightBorderRadius,
            withoutLeftBorderRadius && styles.withoutLeftBorderRadius,
            bordered && themeStyles.bordered,
            getColorStyle(style),
            btnDisabled && styles.btnDisabled,
            btnIsWaiting && styles.btnWaiting,
            (btnDisabled || btnIsWaiting) && getDisabledColorStyle(style),
          )
        }
      >
        {child}
      </button>
    </ConditionalWrapper>
  );

  mainContent.propTypes = {
    btnType: PropTypes.string,
    style: PropTypes.string,
    btnDisabled: PropTypes.bool,
    btnIsWaiting: PropTypes.bool,
    withoutRightBorderRadius: PropTypes.bool,
    withoutLeftBorderRadius: PropTypes.bool,
    bordered: PropTypes.bool,
    child: PropTypes.object,
    btnOnClick: PropTypes.func,
    btnTooltipText: PropTypes.func,
    btnTooltipSide: PropTypes.func,
  };

  const singleButton = () => mainContent({
    btnType: type,
    style: btnStyle,
    btnDisabled: disabled,
    btnIsWaiting: isWaiting,
    withoutRightBorderRadius: false,
    withoutLeftBorderRadius: false,
    bordered: true,
    child: children,
    btnOnClick: onClick,
    btnTooltipText: tooltipText,
    btnTooltipSide: tooltipSide,
  });

  const groupedButton = (index, child) => mainContent({
    btnType: type && type[index],
    style: btnStyle && btnStyle[index],
    btnDisabled: disabled && disabled[index],
    btnIsWaiting: isWaiting && isWaiting[index],
    withoutRightBorderRadius: index !== children.length - 1,
    withoutLeftBorderRadius: index !== 0,
    bordered: children.length === 1,
    child,
    btnOnClick: () => onClick(index),
    btnTooltipText: tooltipText && tooltipText[index],
    btnTooltipSide: tooltipSide && tooltipSide[index],
  });

  return (
    <div className={css(styles.container)}>
      {
        Array.isArray(children)
          ? (
            mapIndexed(
              (child, index) => (
                <React.Fragment key={index}>
                  {groupedButton(index, child)}
                </React.Fragment>
              ),
              children,
            )
          )
          : (
            <>{singleButton()}</>
          )
      }
    </div>
  );
};

ButtonLayout.propTypes = {
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  isWaiting: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string,
  ]),
  btnStyle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  size: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  tooltipText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  tooltipSide: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
};

export default ButtonLayout;
