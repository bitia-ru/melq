import React, { useState } from 'react';
import Input from '@/v1/components/Input/Input';
import { StyleSheet, css } from '@/v1/aphrodite';

const styles = StyleSheet.create({ container: { width: 336 } });
const maxLength = 36;

const InputExample = () => {
  const [value, setValue] = useState(undefined);
  const [disabled, setDisabled] = useState(false);
  const [withCounter, setWithCounter] = useState(true);
  const [withDropdownList, setWithDropdownList] = useState(false);
  const [errorsVisible, setErrorsVisible] = useState(false);

  const onChange = (e) => {
    const currentValue = e?.target?.value !== undefined ? e.target.value : e;
    if (withCounter && currentValue.length <= maxLength) {
      setValue(currentValue);
    }
    if (!withCounter) {
      setValue(currentValue);
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
          checked={withCounter}
          onClick={() => setWithCounter(!withCounter)}
        />
      </div>
      <div>
        С подсказкой ввода:
        <input
          type="checkbox"
          checked={withDropdownList}
          onClick={() => setWithDropdownList(!withDropdownList)}
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
      <Input
        input={{ value, onChange }}
        label="Input"
        placeholder="Enter value"
        maxLength={withCounter ? maxLength : null}
        externalErrors="Error"
        errorsVisible={errorsVisible}
        tooltipText="Введите текст"
        disabled={disabled}
        items={withDropdownList ? ['item1', 'item2', 'item3', 'item4'] : null}
      />
    </div>
  );
};

export default InputExample;
