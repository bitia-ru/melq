import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import { StyleSheet, css } from '../../aphrodite';

import Icon from '../Icon/Icon';
import Link from '../Link/Link';
import Item from '../Item/Item';

import { themeStyles } from '../../theme';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  settingsBtnWrapper: { width: 24 },
  itemWrapper: { marginBottom: 16 },
});

const ThemeSettingsLayout = ({ items, onItemTriggered, showMoreCount, onShowMore }) => (
  <div className={css(styles.container)}>
    <div className={css(styles.header)}>
      <span className={css(themeStyles.headerFont)}>Настроить ленту по темам</span>
      <div className={css(styles.settingsBtnWrapper)}>
        <Icon
          src={`${require('./assets/settings.svg')}#settings`}
          onTriggered={() => console.log('Настроить темы')}
          width={24}
          height={24}
          tooltipText="Настроить темы"
        />
      </div>
    </div>
    <div>
      {
        R.map(
          item => (
            <div className={css(styles.itemWrapper)} key={item.id}>
              <Item {...{ onTriggered: () => onItemTriggered(item.id), ...item.props }} />
            </div>
          ),
          items,
        )
      }
    </div>
    {
      showMoreCount > 0 && (
        <Link onTriggered={onShowMore} size="big">{`Показать еще ${showMoreCount}`}</Link>
      )
    }
  </div>
);

ThemeSettingsLayout.propTypes = {
  items: PropTypes.array,
  onItemTriggered: PropTypes.func,
  showMoreCount: PropTypes.number,
  onShowMore: PropTypes.func,
};

export default ThemeSettingsLayout;
