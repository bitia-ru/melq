import React, { useState } from 'react';
import Input from '@/v1/components/Input/Input';
import { StyleSheet, css } from '@/v1/aphrodite';

const styles = StyleSheet.create({ container: { width: 336 } });
const maxLength = 36;

const InputExample = () => {
  const [value, setValue] = useState(undefined);
  const [size, setSize] = useState(null);
  const [fontSize, setFontSize] = useState(null);
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
      <div>
        Размер:
        <input
          type="radio"
          id="small"
          name="size"
          value="small"
          checked={size === 'small'}
          onClick={() => setSize('small')}
        />
        <span>Small</span>
        <input
          type="radio"
          id="default"
          name="size"
          value="default"
          checked={size === null}
          onClick={() => setSize(null)}
        />
        <span>Default</span>
        <input
          type="radio"
          id="large"
          name="size"
          value="large"
          checked={size === 'large'}
          onClick={() => setSize('large')}
        />
        <span>Large</span>
      </div>
      <div>
        Размер шрифта:
        <input
          type="radio"
          id="smallFont"
          name="fontSize"
          value="small"
          checked={fontSize === 'small'}
          onClick={() => setFontSize('small')}
        />
        <span>Small</span>
        <input
          type="radio"
          id="defaultFont"
          name="fontSize"
          value="default"
          checked={fontSize === null}
          onClick={() => setFontSize(null)}
        />
        <span>Default</span>
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
        size={size}
        fontSize={fontSize}
        items={withDropdownList ? ['item1', 'item2', 'item3', 'item4'] : null}
      />
    </div>
  );
};

export default InputExample;
