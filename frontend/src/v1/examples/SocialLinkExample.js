import React, { useState } from 'react';
import { StyleSheet, css } from '../aphrodite';
import VKIcon from '@/v1/components/social_links/VKIcon/VKIcon';
import InstagramIcon from '@/v1/components/social_links/InstagramIcon/InstagramIcon';
import GoogleIcon from '@/v1/components/social_links/GoogleIcon/GoogleIcon';
import FacebookIcon from '@/v1/components/social_links/FacebookIcon/FacebookIcon';

const styles = StyleSheet.create({
  container: {
    display: 'inline-block',
    margin: 10,
  },
});

const SocialLinkExample = () => {
  const [disabled, setDisabled] = useState(null);

  const onTriggered = () => {
    console.log('triggered');
  };

  return (
    <div>
      <div>
        <input
          type="checkbox"
          checked={disabled}
          onClick={() => setDisabled(!disabled)}
        />
        Disabled
      </div>
      <div className={css(styles.container)}>
        <VKIcon tooltipText="Войти через VK" onTriggered={onTriggered} disabled={disabled} />
      </div>
      <div className={css(styles.container)}>
        <InstagramIcon disabled={disabled} />
      </div>
      <div className={css(styles.container)}>
        <GoogleIcon
          tooltipText="Google"
          tooltipSide="bottom"
          onTriggered={onTriggered}
          disabled={disabled}
        />
      </div>
      <div className={css(styles.container)}>
        <FacebookIcon onTriggered={onTriggered} disabled={disabled} />
      </div>
    </div>
  );
};

export default SocialLinkExample;
