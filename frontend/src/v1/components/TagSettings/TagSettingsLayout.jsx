import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import { StyleSheet, css } from '../../aphrodite';

import Icon from '../Icon/Icon';
import Link from '../Link/Link';
import Tag from '../Tag/Tag';

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

const TagSettingsLayout = ({
  tags,
  onItemTriggered,
  showMoreCount,
  onShowMore,
  setUpTags,
}) => (
  <div className={css(styles.container)}>
    <div className={css(styles.header)}>
      <span className={css(themeStyles.headerFont)}>Настроить ленту по темам</span>
      <div className={css(styles.settingsBtnWrapper)}>
        <Icon
          src={`${require('./assets/settings.svg')}#settings`}
          onTriggered={setUpTags}
          width={24}
          height={24}
          tooltipText="Настроить темы"
        />
      </div>
    </div>
    <div>
      {
        R.map(
          tag => (
            <div className={css(styles.itemWrapper)} key={tag.id}>
              <Tag tag={tag} onTriggered={() => onItemTriggered(tag.id)} />
            </div>
          ),
          tags,
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

TagSettingsLayout.propTypes = {
  tags: PropTypes.array,
  onItemTriggered: PropTypes.func,
  showMoreCount: PropTypes.number,
  onShowMore: PropTypes.func,
  setUpTags: PropTypes.func,
};

export default TagSettingsLayout;
