import React, { useState } from 'react';
import Icon from '@/v1/components/Icon/Icon';
import TrashButton from '@/v1/components/icon_buttons/TrashButton/TrashButton';
import CloseButton from '@/v1/components/icon_buttons/CloseButton/CloseButton';
import CopyLinkButton from '@/v1/components/icon_buttons/CopyLinkButton/CopyLinkButton';
import EditButton from '@/v1/components/icon_buttons/EditButton/EditButton';
import HideButton from '@/v1/components/icon_buttons/HideButton/HideButton';
import LogInButton from '@/v1/components/icon_buttons/LogInButton/LogInButton';
import LogOutButton from '@/v1/components/icon_buttons/LogOutButton/LogOutButton';
import SmallCloseButton from '@/v1/components/icon_buttons/SmallCloseButton/SmallCloseButton';
import { StyleSheet, css } from '../aphrodite';

const styles = StyleSheet.create({
  row: {
    height: 52,
    display: 'flex',
    alignItems: 'center',
  },
  iconContainer: { margin: 10 },
});

const IconExample = () => {
  const [disabled, setDisabled] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [hideBtnSwitchedOn, setHideBtnSwitchedOn] = useState(true);

  const onTriggered = () => {
    console.log('triggered');
  };

  return (
    <>
      <input
        type="checkbox"
        checked={disabled}
        onClick={() => setDisabled(!disabled)}
      />
      Disabled
      <input
        type="checkbox"
        checked={isWaiting}
        onClick={() => setIsWaiting(!isWaiting)}
      />
      Is Waiting
      <div className={css(styles.row)}>
        Simple Icon
        <span className={css(styles.iconContainer)}>
          <Icon
            src={`${require('../../../img/settings.svg')}#settings`}
            onTriggered={onTriggered}
            disabled={disabled}
            isWaiting={isWaiting}
            width={24}
            height={24}
            tooltipText="Настройки"
          />
        </span>
      </div>
      <div className={css(styles.row)}>
        TrashButton
        <span className={css(styles.iconContainer)}>
          <TrashButton onTriggered={onTriggered} disabled={disabled} isWaiting={isWaiting} />
        </span>
      </div>
      <div className={css(styles.row)}>
        CloseButton
        <span className={css(styles.iconContainer)}>
          <CloseButton onTriggered={onTriggered} disabled={disabled} isWaiting={isWaiting} />
        </span>
      </div>
      <div className={css(styles.row)}>
        CopyLinkButton
        <span className={css(styles.iconContainer)}>
          <CopyLinkButton onTriggered={onTriggered} disabled={disabled} isWaiting={isWaiting} />
        </span>
      </div>
      <div className={css(styles.row)}>
        EditButton
        <span className={css(styles.iconContainer)}>
          <EditButton onTriggered={onTriggered} disabled={disabled} isWaiting={isWaiting} />
        </span>
      </div>
      <div className={css(styles.row)}>
        HideButton
        <span className={css(styles.iconContainer)}>
          <HideButton
            onTriggered={() => setHideBtnSwitchedOn(!hideBtnSwitchedOn)}
            disabled={disabled}
            isWaiting={isWaiting}
            switchedOn={hideBtnSwitchedOn}
          />
        </span>
      </div>
      <div className={css(styles.row)}>
        LogInButton
        <span className={css(styles.iconContainer)}>
          <LogInButton onTriggered={onTriggered} disabled={disabled} isWaiting={isWaiting} />
        </span>
      </div>
      <div className={css(styles.row)}>
        LogOutButton
        <span className={css(styles.iconContainer)}>
          <LogOutButton onTriggered={onTriggered} disabled={disabled} isWaiting={isWaiting} />
        </span>
      </div>
      <div className={css(styles.row)}>
        SmallCloseButton
        <span className={css(styles.iconContainer)}>
          <SmallCloseButton
            onTriggered={onTriggered}
          />
        </span>
      </div>
    </>
  );
};

export default IconExample;
