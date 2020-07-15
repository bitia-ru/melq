import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import Item from '@/v1/components/Item/Item';
import LanguageSelectLayout from './LanguageSelectLayout';

const languages = [
  {
    id: 'ru',
    component: Item,
    componentProps: {
      text: 'Русский',
      iconSrc: require('./images/ru.png'),
      tooltipText: 'Переключиться на русский язык',
      size: 'small',
      width: 24,
      height: 16,
      textMargin: 7,
    },
  },
  {
    id: 'en',
    component: Item,
    componentProps: {
      text: 'English',
      iconSrc: require('./images/en.png'),
      tooltipText: 'Switch to english language',
      size: 'small',
      width: 24,
      height: 16,
      textMargin: 7,
    },
  },
];

const LanguageSelect = ({ languageId, onChange, disabled, tooltipText, tooltipSide }) => {
  let listFocused;
  const [droppedDown, setDroppedDown] = useState(false);
  const [listRef, setListRef] = useState(undefined);

  const onKeyDown = (e) => {
    if (e.keyCode === 40) {
      listFocused = true;
      listRef.focus();
    }
  };

  const onBlur = () => {
    if (!listFocused) {
      setDroppedDown(false);
    }
    listRef && listRef.focus();
  };

  const onTriggered = () => {
    setDroppedDown(!droppedDown);
  };

  const onItemTriggered = (id) => {
    onChange(id);
    setDroppedDown(false);
  };

  return (
    <LanguageSelectLayout
      language={R.find(R.propEq('id', languageId))(languages)}
      languages={languages}
      disabled={disabled}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onTriggered={onTriggered}
      onBlur={onBlur}
      tooltipText={tooltipText}
      tooltipSide={tooltipSide}
      droppedDown={droppedDown}
      setListRef={setListRef}
      onItemTriggered={onItemTriggered}
    />
  );
};

LanguageSelect.propTypes = {
  languageId: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  tooltipText: PropTypes.string,
  tooltipSide: PropTypes.string,
};

export default LanguageSelect;
