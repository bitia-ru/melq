import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { StyleSheet, css } from '@/v1/aphrodite';
import {
  themeStyles,
  defaultColor,
  focusBorderColor,
  infoColor,
  mainFontColor,
  disabledColor,
} from '@/v1/theme';
import ConditionalWrapper from '@/v1/utils/conditionalWrapper';
import Tooltip from '@/v1/components/Tooltip/Tooltip';
import Icon from '@/v1/components/Icon/Icon';
import List from '@/v1/components/List/List';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
  focusedIcon: {
    '>svg': {
      fill: infoColor,
      stroke: infoColor,
    },
  },
  input: {
    outline: 'none',
    marginLeft: -24,
    paddingLeft: 32,
    paddingBottom: 3,
    width: '100%',
    boxSizing: 'border-box',
    border: 'none',
    color: mainFontColor,
    background: 'transparent',
    ':placeholder': { color: defaultColor },
    ':focus': { borderBottom: `1px solid ${focusBorderColor}` },
  },
  disabledInput: {
    cursor: 'not-allowed',
    color: disabledColor,
  },
  listContainer: {
    marginTop: 8,
    position: 'absolute',
    width: '100%',
  },
});

const SearchLayout = ({
  text,
  tooltipText,
  tooltipSide,
  variants,
  onFocus,
  onBlur,
  onKeyDown,
  onChange,
  focused,
  disabled,
}) => (
  <ConditionalWrapper
    condition={tooltipText}
    wrapper={
      content => (
        <Tooltip tooltipText={tooltipText} tooltipSide={tooltipSide}>
          {content}
        </Tooltip>
      )
    }
  >
    <div className={css(styles.container)}>
      <Icon
        src={`${require('./assets/search.svg')}#search`}
        width={24}
        height={24}
        iconStyle={focused ? styles.focusedIcon : null}
        disabled={disabled}
      />
      <input
        value={text || ''}
        className={css(styles.input, themeStyles.mediumFont, disabled && styles.disabledInput)}
        placeholder={focused ? null : 'Поиск...'}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        disabled={disabled}
        onChange={onChange}
      />
      {
        focused && !R.isEmpty(variants) && (
          <div className={css(styles.listContainer)}>
            <List items={variants} onItemTriggered={onChange} />
          </div>
        )
      }
    </div>
  </ConditionalWrapper>
);

SearchLayout.propTypes = {
  text: PropTypes.string,
  variants: PropTypes.array,
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  focused: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

export default SearchLayout;
