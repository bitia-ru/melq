import React, { useState } from 'react';
import Menu from '../components/Menu/Menu';
import { css, StyleSheet } from '../aphrodite';

const styles = StyleSheet.create({
  wrapper: { display: 'flex' },
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: 250,
    justifyContent: 'center',
  },
  btnWrapper: { margin: '5px 20px' },
});

const MenuExample = () => {
  const [selectedLinkId, setSelectedLinkId] = useState(null);
  const [disabledItem, setDisabledItem] = useState({});

  const disableMenuItem = (id) => {
    if (disabledItem[id]) {
      setDisabledItem({
        ...disabledItem,
        [id]: !disabledItem[id],
      });
    } else {
      setDisabledItem({
        ...disabledItem,
        [id]: true,
      });
    }
  };

  const menuItems = [
    {
      id: 0,
      disabled: disabledItem[0],
      link: {
        isWaiting: false,
        onTriggered: (
          () => {
            console.log('Open settings');
            setSelectedLinkId(0);
          }
        ),
        linkStyle: 'dark',
        title: 'Базовая информация / настройки',
        size: 'big',
        selected: !disabledItem[0] && selectedLinkId === 0,
      },
      icon: {
        src: `${require('../components/Menu/images/settings.svg')}#settings`,
        onTriggered: (
          () => {
            console.log('Open settings');
            setSelectedLinkId(0);
          }
        ),
        isWaiting: false,
        width: 24,
        height: 24,
        tooltipText: 'Настройки',
        tooltipSide: 'right',
      },
    },
    {
      id: 1,
      disabled: disabledItem[1],
      link: {
        isWaiting: false,
        onTriggered: (
          () => {
            console.log('Open posts');
            setSelectedLinkId(1);
          }
        ),
        linkStyle: 'dark',
        title: 'Посты',
        size: 'big',
        selected: !disabledItem[1] && selectedLinkId === 1,
      },
      icon: {
        src: `${require('../components/Menu/images/add.svg')}#add`,
        onTriggered: (
          () => {
            console.log('Open new post window');
            setSelectedLinkId(1);
          }
        ),
        isWaiting: false,
        width: 24,
        height: 24,
        tooltipText: 'Добавить пост',
        tooltipSide: 'right',
      },
    },
    {
      id: 2,
      disabled: disabledItem[2],
      link: {
        isWaiting: false,
        onTriggered: (
          () => {
            console.log('Open tags');
            setSelectedLinkId(2);
          }
        ),
        linkStyle: 'dark',
        title: 'Темы блога',
        size: 'big',
        selected: !disabledItem[2] && selectedLinkId === 2,
      },
      icon: {
        src: `${require('../components/Menu/images/add.svg')}#add`,
        onTriggered: (
          () => {
            console.log('Open new tag window');
            setSelectedLinkId(2);
          }
        ),
        isWaiting: false,
        width: 24,
        height: 24,
        tooltipText: 'Добавить тему',
        tooltipSide: 'right',
      },
    },
    {
      id: 3,
      disabled: disabledItem[3],
      link: {
        isWaiting: false,
        onTriggered: (
          () => {
            console.log('Open about blog post');
            setSelectedLinkId(3);
          }
        ),
        linkStyle: 'dark',
        title: 'Об этом блоге',
        size: 'big',
        selected: !disabledItem[3] && selectedLinkId === 3,
      },
      icon: {
        src: `${require('../components/Menu/images/edit.svg')}#edit`,
        onTriggered: (
          () => {
            console.log('Edit about blog post');
            setSelectedLinkId(3);
          }
        ),
        isWaiting: false,
        width: 24,
        height: 24,
        tooltipText: 'Редактировать',
        tooltipSide: 'right',
      },
    },
    {
      id: 4,
      disabled: disabledItem[4],
      link: {
        isWaiting: false,
        onTriggered: (
          () => {
            console.log('Open privacy policy post');
            setSelectedLinkId(4);
          }
        ),
        linkStyle: 'dark',
        title: 'Правила использования материалов',
        size: 'big',
        selected: !disabledItem[4] && selectedLinkId === 4,
      },
      icon: {
        src: `${require('../components/Menu/images/edit.svg')}#edit`,
        onTriggered: (
          () => {
            console.log('Edit privacy policy post');
            setSelectedLinkId(4);
          }
        ),
        isWaiting: false,
        width: 24,
        height: 24,
        tooltipText: 'Редактировать',
        tooltipSide: 'right',
      },
    },
  ];

  return (
    <div>
      <div className={css(styles.container)}>
        <Menu
          width="433px"
          height="250px"
          menuItems={menuItems}
        />
      </div>
      <div className={css(styles.container)}>
        <div className={css(styles.btnWrapper)}>
          <button
            onClick={() => disableMenuItem(0)}
            type="button"
          >
            Click
          </button>
          <span> Disable menu item 1</span>
        </div>
        <div className={css(styles.btnWrapper)}>
          <button
            onClick={() => disableMenuItem(1)}
            type="button"
          >
            Click
          </button>
          <span> Disable menu item 2</span>
        </div>
        <div className={css(styles.btnWrapper)}>
          <button
            onClick={() => disableMenuItem(2)}
            type="button"
          >
            Click
          </button>
          <span> Disable menu item 3</span>
        </div>
        <div className={css(styles.btnWrapper)}>
          <button
            onClick={() => disableMenuItem(3)}
            type="button"
          >
            Click
          </button>
          <span> Disable menu item 4</span>
        </div>
        <div className={css(styles.btnWrapper)}>
          <button
            onClick={() => disableMenuItem(4)}
            type="button"
          >
            Click
          </button>
          <span> Disable menu item 5</span>
        </div>
      </div>
    </div>
  );
};

export default MenuExample;
