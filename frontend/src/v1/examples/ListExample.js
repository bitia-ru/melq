import React, { useEffect, useState } from 'react';
import List from '@/v1/components/List/List';
import { StyleSheet, css } from '@/v1/aphrodite';
import Item from '@/v1/components/Item/Item';

const styles = StyleSheet.create({
  container: { width: 336, margin: 10 },
  inputContainer: { width: '100%', boxSizing: 'border-box' },
});

const ListExample = () => {
  const [itemsData, setItemsData] = useState(
    JSON.stringify(
      [
        {
          id: 1,
          text: 'item 1',
          tooltipText: 'Tooltip for item 1',
          tooltipSide: 'top',
        },
        'item 2',
        {
          id: 3,
          text: 'item 3',
          tooltipText: 'Tooltip for item 3',
          tooltipSide: 'bottom',
        },
        {
          id: 4,
          text: 'item 4',
          tooltipText: 'Tooltip for item 4',
        },
      ],
    ),
  );

  const itemsWithIcons = [
    {
      id: 1,
      component: Item,
      componentProps: {
        text: 'Тема 1',
        iconSrc: require('./images/demoItemIcon.png'),
        tooltipText: 'Тема 1',
        size: 'small',
      },
    },
    {
      id: 2,
      component: Item,
      componentProps: {
        text: 'Тема 2',
        iconSrc: require('./images/demoItemIcon.png'),
        tooltipText: 'Тема 2',
        size: 'small',
      },
    },
    {
      id: 3,
      component: Item,
      componentProps: {
        text: 'Тема 3',
        iconSrc: require('./images/demoItemIcon.png'),
        tooltipText: 'Тема 3',
        size: 'small',
      },
    },
  ];

  const itemsWithLanguageIcons = [
    {
      id: 'ru',
      component: Item,
      componentProps: {
        text: 'Русский',
        iconSrc: require('./images/demoLanguageItemIconRu.png'),
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
        iconSrc: require('./images/demoLanguageItemIconEn.png'),
        tooltipText: 'Switch to english language',
        size: 'small',
        width: 24,
        height: 16,
        textMargin: 7,
      },
    },
  ];

  const [items, setItems] = useState([]);

  const update = () => {
    setItems(JSON.parse(itemsData));
  };

  useEffect(() => {
    update();
  }, []);

  const onItemTriggered = (item) => {
    console.log(item);
  };

  return (
    <>
      <div>
        Данные пунктов списка:
        <input
          value={itemsData}
          className={css(styles.inputContainer)}
          onChange={e => setItemsData(e.target.value)}
        />
      </div>
      <button type="button" onClick={update}>Обновить</button>
      <div className={css(styles.container)}>
        <List onItemTriggered={onItemTriggered} items={items} />
      </div>
      Примеры List на базе компонента Item
      <div className={css(styles.container)}>
        <List onItemTriggered={onItemTriggered} items={itemsWithIcons} />
      </div>
      <div className={css(styles.container)}>
        <List onItemTriggered={onItemTriggered} items={itemsWithLanguageIcons} />
      </div>
    </>
  );
};

export default ListExample;
