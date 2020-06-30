import React, { useState } from 'react';
import Link from '@/v1/components/Link/Link';
import { StyleSheet, css } from '@/v1/aphrodite';

const styles = StyleSheet.create({
  linkText: {
    marginLeft: 7,
    marginTop: 1,
  },
  linkContainer: {
    display: 'inline-block',
    marginTop: 20,
  },
  innerContainer: {
    display: 'flex',
    alignItems: 'center',
  },
});

const LinkExample = () => {
  const [disabled, setDisabled] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [big, setBig] = useState(false);
  const [dark, setDark] = useState(false);
  const [selected, setSelected] = useState(false);

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
      <input
        type="checkbox"
        checked={big}
        onClick={() => setBig(!big)}
      />
      Big
      <input
        type="checkbox"
        checked={dark}
        onClick={() => setDark(!dark)}
      />
      Dark
      <input
        type="checkbox"
        checked={selected}
        onClick={() => setSelected(!selected)}
      />
      Selected
      <div>
        <div className={css(styles.linkContainer)}>
          <Link
            onTriggered={onTriggered}
            size={big ? 'big' : null}
            disabled={disabled}
            isWaiting={isWaiting}
            linkStyle={dark ? 'dark' : null}
            selected={selected}
            tooltipText="Перейти к списку постов"
          >
            Блог
          </Link>
        </div>
      </div>
      <div>
        <div className={css(styles.linkContainer)}>
          <Link
            onTriggered={onTriggered}
            size={big ? 'big' : null}
            disabled={disabled}
            isWaiting={isWaiting}
            linkStyle={dark ? 'dark' : null}
            selected={selected}
            tooltipText="Открыть окно отправки сообщений"
            tooltipSide="bottom"
          >
            Написать автору
          </Link>
        </div>
      </div>
      <div>
        <div className={css(styles.linkContainer)}>
          <Link
            onTriggered={onTriggered}
            size={big ? 'big' : null}
            disabled={disabled}
            isWaiting={isWaiting}
            linkStyle={dark ? 'dark' : null}
            selected={selected}
            tooltipText="Перейти к предпросмотру"
          >
            <div className={css(styles.innerContainer)}>
              <svg width={16} height={16}>
                <use xlinkHref={`${require('../components/Link/images/preview.svg')}#preview`} />
              </svg>
              <span className={css(styles.linkText)}>Предпросмотр</span>
            </div>
          </Link>
        </div>
      </div>
      <div>
        <div className={css(styles.linkContainer)}>
          <Link
            onTriggered={onTriggered}
            size={big ? 'big' : null}
            disabled={disabled}
            isWaiting={isWaiting}
            linkStyle={dark ? 'dark' : null}
            selected={selected}
            tooltipText="Удалить"
            tooltipSide="top"
          >
            <div className={css(styles.innerContainer)}>
              <svg width={16} height={16}>
                <use xlinkHref={`${require('../components/Link/images/trash.svg')}#trash`} />
              </svg>
              <span className={css(styles.linkText)}>Удалить</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default LinkExample;
