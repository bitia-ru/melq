import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ListLayout from './ListLayout';

const List = ({ items, onItemTriggered, setRef }) => {
  const [mouseOver, setMouseOver] = useState(undefined);
  const [selectedItemIndex, setSelectedItemIndex] = useState(undefined);

  const onKeyDown = (e) => {
    if (e.keyCode === 40) {
      setSelectedItemIndex(
        selectedItemIndex === undefined
          ? 0
          : Math.min(items.length - 1, selectedItemIndex + 1),
      );
    }
    if (e.keyCode === 38) {
      setSelectedItemIndex(Math.max(0, selectedItemIndex - 1));
    }
    if (e.keyCode === 13 || e.keyCode === 32) {
      onItemTriggered(
        typeof items[selectedItemIndex] === 'object'
          ? items[selectedItemIndex].id
          : items[selectedItemIndex],
      );
    }
  };

  const onFocus = () => {
    if (selectedItemIndex === undefined && !mouseOver) {
      setSelectedItemIndex(0);
    }
  };

  const onBlur = () => { setSelectedItemIndex(undefined); };

  return (
    <ListLayout
      items={items}
      onClick={onItemTriggered}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      setRef={setRef}
      selectItem={setSelectedItemIndex}
      selectedItemIndex={selectedItemIndex}
    />
  );
};

List.propTypes = {
  items: PropTypes.array,
  onItemTriggered: PropTypes.func,
  setRef: PropTypes.func,
};

export default List;
