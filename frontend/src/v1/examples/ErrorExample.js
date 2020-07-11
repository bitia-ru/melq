import React, { useState } from 'react';
import Error from '@/v1/components/Error/Error';
import { StyleSheet, css } from '@/v1/aphrodite';

const styles = StyleSheet.create({
  container: { width: 336, margin: 10 },
  inputContainer: { width: '100%', boxSizing: 'border-box' },
});

const ErrorExample = () => {
  const [message, setMessage] = useState('Неправильно введен пароль');

  return (
    <>
      <div>
        Текст ошибки:
        <input
          value={message}
          className={css(styles.inputContainer)}
          onChange={e => setMessage(e.target.value)}
        />
      </div>
      <div className={css(styles.container)}>
        <Error message={message} />
      </div>
    </>
  );
};

export default ErrorExample;
