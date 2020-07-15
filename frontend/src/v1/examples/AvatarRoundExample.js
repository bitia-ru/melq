import React from 'react';
import AvatarRound from '@/v1/components/AvatarRound/AvatarRound';
import { StyleSheet, css } from '../aphrodite';

const styles = StyleSheet.create({ avatarWrapper: { display: 'inline-block' } });

const AvatarRoundExample = () => (
  <>
    <div className={css(styles.avatarWrapper)}>
      <AvatarRound
        src={require('./images/demo_avatar.png')}
        tooltipText="Avatar"
        tooltipSide="bottom"
      />
    </div>
    <div className={css(styles.avatarWrapper)}>
      <AvatarRound
        src={require('./images/demo_avatar.png')}
        size="small"
        tooltipText="Small avatar"
        tooltipSide="bottom"
      />
    </div>
    <div className={css(styles.avatarWrapper)}>
      <AvatarRound size="small" tooltipText="Avatar when no image set" />
    </div>
  </>
);

export default AvatarRoundExample;
