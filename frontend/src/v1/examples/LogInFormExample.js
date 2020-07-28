import React, { useState, useEffect } from 'react';
import LogInForm from '@/v1/components/LogInForm/LogInForm';
import { StyleSheet, css } from '../aphrodite';

const styles = StyleSheet.create({
  input: {
    width: '100%',
    boxSizing: 'border-box',
  },
});

const LogInFormExample = () => {
  const [externalErrorsData, setExternalErrorsData] = useState(
    JSON.stringify({
      email: 'Invalid email',
      password: 'Invalid password',
    }),
  );

  const [externalErrors, setExternalErrors] = useState({});

  const update = () => {
    setExternalErrors(JSON.parse(externalErrorsData));
  };

  const onSubmit = (fields) => {
    console.log(fields);
  };

  useEffect(() => update(), []);

  return (
    <>
      <div>
        Ошибки:
        <input
          value={externalErrorsData}
          className={css(styles.input)}
          onChange={e => setExternalErrorsData(e.target.value)}
        />
      </div>
      <button type="button" onClick={update}>Обновить</button>
      <LogInForm
        onSubmit={onSubmit}
        externalErrors={externalErrors}
      />
    </>
  );
};

export default LogInFormExample;
