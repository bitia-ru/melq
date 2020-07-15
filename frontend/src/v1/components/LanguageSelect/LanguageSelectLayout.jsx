import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from '../../aphrodite';
import List from '@/v1/components/List/List';
import { infoColor } from '@/v1/theme';

const styles = StyleSheet.create({
  container: { position: 'relative' },
  select: { display: 'inline-block' },
  itemHoverStyle: {
    ':hover': {
      backgroundColor: 'transparent',
      '>span': { color: infoColor },
    },
  },
  listContainer: {
    width: 222,
    position: 'absolute',
  },
});

const LanguageSelectLayout = ({
  language,
  languages,
  disabled,
  onTriggered,
  onKeyDown,
  onBlur,
  onItemTriggered,
  tooltipText,
  tooltipSide,
  droppedDown,
  setListRef,
}) => (
  <div className={css(styles.container)} onBlur={onBlur} tabIndex={-1}>
    <div role="button" tabIndex={-1} className={css(styles.select)} onKeyDown={onKeyDown}>
      {
        React.createElement(
          language.component,
          {
            ...language.componentProps,
            size: null,
            tooltipText,
            tooltipSide,
            disabled,
            hoverable: !disabled,
            focusable: true,
            onTriggered,
            itemHoverStyle: styles.itemHoverStyle,
          },
        )
      }
    </div>
    {
      droppedDown && (
        <div className={css(styles.listContainer)}>
          <List onItemTriggered={onItemTriggered} items={languages} setRef={setListRef} />
        </div>
      )
    }
  </div>
);

LanguageSelectLayout.propTypes = {
  language: PropTypes.object,
  languages: PropTypes.array,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  tooltipSide: PropTypes.string,
  tooltipText: PropTypes.string,
  droppedDown: PropTypes.bool,
  onItemTriggered: PropTypes.func,
  setListRef: PropTypes.func,
};

export default LanguageSelectLayout;
