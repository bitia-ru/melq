import React, { useState } from 'react';
import * as R from 'ramda';

import ThemeSettingsLayout from './ThemeSettingsLayout';

const itemsWithIcons = R.map(
  e => (
    {
      id: e,
      props: {
        text: `Тема ${e}`,
        iconSrc: require('./assets/demoItemIcon.png'),
        tooltipText: `Показать посты по теме ${e}`,
      },
    }
  ),
  Array.from(Array(20).keys()),
);

const DEFAULT_DISPLAYED_LENGTH = 7;

const ThemeSettings = () => {
  const [items] = useState(itemsWithIcons);
  const [showMoreBtnVisible, setShowMoreBtnVisible] = useState(
    itemsWithIcons.length > DEFAULT_DISPLAYED_LENGTH,
  );

  return (
    <ThemeSettingsLayout
      items={
        showMoreBtnVisible ? R.slice(0, DEFAULT_DISPLAYED_LENGTH, items) : items
      }
      onItemTriggered={() => {}}
      onShowMore={() => setShowMoreBtnVisible(false)}
      showMoreCount={showMoreBtnVisible ? items.length - DEFAULT_DISPLAYED_LENGTH : 0}
    />
  );
};

export default ThemeSettings;
