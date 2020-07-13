import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { StyleSheet, css } from '../../aphrodite';
import { bgColor, focusBgColor, themeStyles } from '@/v1/theme';
import ConditionalWrapper from '@/v1/utils/conditionalWrapper';
import Tooltip from '@/v1/components/Tooltip/Tooltip';

const styles = StyleSheet.create({
  container: {
    backgroundColor: bgColor,
    outline: 'none',
    paddingTop: 8,
    paddingBottom: 8,
  },
  row: {
    outline: 'none',
    display: 'flex',
    cursor: 'pointer',
    paddingLeft: 21,
    paddingTop: 7,
    paddingBottom: 7,
    boxSizing: 'border-box',
    width: '100%',
  },
  rowInner: { maxWidth: 'calc(100% - 50px)' },
  hoveredRow: { ':hover': { backgroundColor: focusBgColor } },
  selectedRow: { backgroundColor: focusBgColor },
});

const mapIndexed = R.addIndex(R.map);

const ListLayout = ({
  items,
  onClick,
  selectedItemIndex,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  selectItem,
  onFocus,
  onBlur,
  setRef,
}) => {
  const renderItem = (item) => {
    if (typeof item !== 'object') {
      return item;
    }
    if (item.text) {
      return item.text;
    }
    return React.createElement(
      item.component,
      { ...item.componentProps },
    );
  };

  return (
    <div
      role="button"
      tabIndex={0}
      ref={setRef}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      className={css(styles.container, themeStyles.shadowed, themeStyles.bordered)}
    >
      {
        mapIndexed(
          (item, index) => {
            const isObject = typeof item === 'object';

            return (
              <ConditionalWrapper
                key={isObject ? item.id : item}
                condition={isObject && item.tooltipText}
                wrapper={
                  content => (
                    <Tooltip tooltipText={item.tooltipText} tooltipSide={item.tooltipSide}>
                      {content}
                    </Tooltip>
                  )
                }
              >
                <div
                  role="button"
                  tabIndex={-1}
                  onMouseDown={() => onClick(isObject ? item.id : item)}
                  onClick={() => selectItem(index)}
                  className={
                    css(
                      styles.row,
                      themeStyles.smallFont,
                      styles.hoveredRow,
                      selectedItemIndex === index && styles.selectedRow,
                    )
                  }
                >
                  <span className={css(styles.rowInner)}>{renderItem(item)}</span>
                </div>
              </ConditionalWrapper>
            );
          },
          items,
        )
      }
    </div>
  );
}

ListLayout.propTypes = {
  items: PropTypes.array,
  onClick: PropTypes.func,
  selectedItemIndex: PropTypes.number,
  selectItem: PropTypes.func,
  onKeyDown: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  setRef: PropTypes.func,
};

export default ListLayout;
