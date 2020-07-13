import React, { useState } from 'react';
import TextArea from '@/v1/components/TextArea/TextArea';
import { StyleSheet, css } from '@/v1/aphrodite';

const styles = StyleSheet.create({ container: { width: 336 } });
const maxLength = 36;

const TextAreaExample = () => {
  const [value, setValue] = useState(undefined);
  const [disabled, setDisabled] = useState(false);
  const [withCounter, setWithCounter] = useState(true);
  const [errorsVisible, setErrorsVisible] = useState(false);

  const onChange = (e) => {
    if (withCounter && e.target.value.length <= maxLength) {
      setValue(e.target.value);
    }
    if (!withCounter) {
      setValue(e.target.value);
    }
  };

  return (
    <div className={css(styles.container)}>
      Включить отображение ошибки:
      <input
        type="checkbox"
        checked={errorsVisible}
        onClick={() => setErrorsVisible(!errorsVisible)}
      />
      <div>
        С ограничением на число символов:
        <input
          type="checkbox"
          id="counter"
          name="type"
          value="counter"
          checked={withCounter}
          onClick={() => setWithCounter(!withCounter)}
        />
      </div>
      <div>
        Disabled:
        <input
          type="checkbox"
          checked={disabled}
          onClick={() => setDisabled(!disabled)}
        />
      </div>
      <TextArea
        input={{ value, onChange }}
        label="Text Area"
        placeholder="Enter value"
        maxLength={withCounter ? maxLength : null}
        externalErrors="Error"
        errorsVisible={errorsVisible}
        tooltipText="Введите текст"
        disabled={disabled}
      />
    </div>
  );
};

export default TextAreaExample;
