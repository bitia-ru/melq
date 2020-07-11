import React, { useState } from 'react';
import Item from '@/v1/components/Item/Item';
import { StyleSheet, css } from '@/v1/aphrodite';
import { infoColor } from '@/v1/theme';

const styles = StyleSheet.create({
  container: {
    display: 'inline-block',
    padding: 10,
  },
  fixedSizeContainer: {
    width: 336,
    padding: 10,
  },
  itemHoverStyle: {
    ':hover': {
      backgroundColor: 'transparent',
      '>span': { color: infoColor },
    },
  },
});

const ItemExample = () => {
  const [disabled, setDisabled] = useState(false);

  const onTriggered = () => {
    console.log('triggered');
  };

  return (
    <>
      <div>
        <div className={css(styles.fixedSizeContainer)}>
          <Item
            text="Название темы"
            iconSrc={require('./images/demoItemIcon.png')}
            tooltipText="Описание темы"
            onTriggered={onTriggered}
            hoverable
            focusable
          />
        </div>
      </div>
      <div>
        <div className={css(styles.container)}>
          <Item
            text="Название темы"
            iconSrc={require('./images/demoItemIcon.png')}
            size="small"
          />
        </div>
      </div>
      <div>
        <div className={css(styles.container)}>
          <Item
            text="Русский"
            iconSrc={require('./images/demoLanguageItemIcon.png')}
            tooltipText="Сменить язык"
            onTriggered={onTriggered}
            width={24}
            height={16}
            textMargin={7}
            focusable
            hoverable={!disabled}
            disabled={disabled}
            itemHoverStyle={styles.itemHoverStyle}
          />
        </div>
        Disabled
        <input type="checkbox" checked={disabled} onClick={() => setDisabled(!disabled)} />
      </div>
      <div>
        <div className={css(styles.container)}>
          <Item
            text="Русский"
            iconSrc={require('./images/demoLanguageItemIcon.png')}
            size="small"
            width={24}
            height={16}
            textMargin={7}
          />
        </div>
      </div>
    </>
  );
};

export default ItemExample;
