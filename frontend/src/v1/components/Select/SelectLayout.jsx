import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { StyleSheet, css } from '../../aphrodite';
import {
  mainFontColor,
  themeStyles,
  defaultColor,
  focusBorderColor,
  focusBgColor,
  disabledColor,
  bgColor,
} from '@/v1/theme';
import Tooltip from '@/v1/components/Tooltip/Tooltip';
import List from '@/v1/components/List/List';
import ConditionalWrapper from '@/v1/utils/conditionalWrapper';
import CheckBox from '@/v1/components/CheckBox/CheckBox';

const styles = StyleSheet.create({
  container: {
    outlineOffset: 1,
    position: 'relative',
  },
  label: {
    color: defaultColor,
    marginBottom: 5,
  },
  disabledLabel: { color: disabledColor },
  select: {
    height: 48,
    outline: 'none',
    paddingLeft: 20,
    border: `1px solid ${focusBorderColor}`,
    display: 'flex',
    boxSizing: 'border-box',
    width: '100%',
    color: mainFontColor,
    cursor: 'pointer',
    alignItems: 'center',
    backgroundColor: bgColor,
  },
  selectInner: {
    display: 'inline-block',
    width: 'auto',
    maxWidth: 'calc(100% - 50px)',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  droppedDownSelect: { backgroundColor: focusBgColor },
  disabledSelect: {
    border: `1px solid ${disabledColor}`,
    backgroundColor: bgColor,
    color: disabledColor,
    cursor: 'not-allowed',
    '::placeholder': { color: disabledColor },
  },
  selectContainer: { position: 'relative', width: '100%' },
  listContainer: {
    paddingTop: 8,
    zIndex: 100,
    position: 'absolute',
    width: '100%',
  },
  arrowContainer: {
    position: 'absolute',
    right: 22.5,
    top: 10,
    '>svg': {
      fill: defaultColor,
      stroke: defaultColor,
    },
  },
  arrowContainerDisabled: {
    '>svg': {
      fill: disabledColor,
      stroke: disabledColor,
    },
  },
  placeholder: { color: defaultColor },
  itemContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  itemInnerContainer: {
    marginLeft: 8,
    width: '100%',
  },
  selectItemWrapper: { display: 'inline-block', maxWidth: '100%' },
  selectItemContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    maxWidth: '100%',
  },
  selectItemInnerContainer: { display: 'inline-block', maxWidth: '100%' },
});

const mapIndexed = R.addIndex(R.map);

const SelectLayout = ({
  input,
  label,
  placeholder,
  items,
  onItemTriggered,
  showDropdownList,
  onClick,
  onBlur,
  onKeyDown,
  setListRef,
  tooltipText,
  tooltipSide,
  disabled,
  multiple,
}) => {
  const renderItem = (value) => {
    if (items.length === 0) {
      return null;
    }
    if (typeof items[0] !== 'object') {
      if (multiple) {
        return items[value];
      }
      return value;
    }
    const item = R.find(R.propEq('id', value))(items);
    if (item && item.text) {
      return item.text;
    }
    return React.createElement(
      item.component,
      { ...item.componentProps, disabled },
    );
  };

  const renderSelected = (data) => {
    if (typeof data === 'object') {
      return mapIndexed(
        (e, index) => (
          <span key={index} className={css(styles.selectItemWrapper)}>
            <span className={css(styles.selectItemContainer)}>
              <span className={css(styles.selectItemInnerContainer)}>
                {renderItem(e)}
              </span>
              {index !== data.length - 1 && <span>,&nbsp;</span>}
            </span>
          </span>
        ),
        data,
      );
    }
    return renderItem(data);
  };

  const renderListItem = (item) => {
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

  const getChecked = (item) => {
    if (typeof item !== 'object') {
      return R.contains(item, input.value);
    }
    return R.contains(item.id, input.value);
  };

  const renderItemsWithCheckBoxes = () => (
    mapIndexed(
      (item, index) => ({
        ...(typeof item === 'object' ? item : { id: index }),
        component: () => (
          <span className={css(styles.itemContainer)}>
            <CheckBox
              checked={getChecked(typeof item === 'object' ? item : { id: index })}
              size="small"
            />
            <span className={css(styles.itemInnerContainer)}>{renderListItem(item)}</span>
          </span>
        ),
      }),
      items,
    )
  );

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      className={css(styles.container, themeStyles.focusableParent)}
      onBlur={showDropdownList ? onBlur : null}
      onKeyDown={disabled ? null : onKeyDown}
    >
      {
        label && (
          <span
            className={
              css(
                themeStyles.defaultFont,
                styles.label,
                disabled && styles.disabledLabel,
              )
            }
          >
            {label}
          </span>
        )
      }
      <div>
        <ConditionalWrapper
          condition={tooltipText}
          wrapper={
            content => (
              <Tooltip
                tooltipText={tooltipText}
                tooltipSide={tooltipSide}
              >
                {content}
              </Tooltip>
            )
          }
        >
          <div className={css(styles.selectContainer)}>
            <span
              role="button"
              tabIndex={-1}
              placeholder={placeholder}
              disabled={disabled}
              onClick={disabled ? null : onClick}
              className={
                css(
                  themeStyles.smallFont,
                  themeStyles.bordered,
                  styles.select,
                  (!input.value || R.isEmpty(input.value)) && styles.placeholder,
                  showDropdownList && styles.droppedDownSelect,
                  disabled && styles.disabledSelect,
                )
              }
            >
              <span className={css(styles.selectInner)}>
                {input.value && !R.isEmpty(input.value) ? renderSelected(input.value) : placeholder}
              </span>
            </span>
            <span className={css(styles.arrowContainer, disabled && styles.arrowContainerDisabled)}>
              <svg
                width={11}
                height={7}
                style={showDropdownList ? { transform: 'rotate(180deg)' } : {}}
              >
                <use xlinkHref={`${require('./images/arrow.svg')}#arrow`} />
              </svg>
            </span>
          </div>
        </ConditionalWrapper>
        {
          showDropdownList && (
            <div className={css(styles.listContainer)}>
              <List
                items={multiple ? renderItemsWithCheckBoxes() : items}
                onItemTriggered={onItemTriggered}
                setRef={setListRef}
              />
            </div>
          )
        }
      </div>
    </div>
  );
};

SelectLayout.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  items: PropTypes.array,
  onItemTriggered: PropTypes.func,
  showDropdownList: PropTypes.bool,
  onClick: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  setListRef: PropTypes.func,
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
  disabled: PropTypes.bool,
  multiple: PropTypes.bool,
};

export default SelectLayout;
