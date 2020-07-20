import React, { useState } from 'react';
import * as R from 'ramda';
import Select from '@/v1/components/Select/Select';
import { StyleSheet, css } from '@/v1/aphrodite';
import Item from '@/v1/components/Item/Item';

const styles = StyleSheet.create({ container: { width: 336 } });

const SelectExample = () => {
  const [value, setValue] = useState(undefined);
  const [valueItem, setValueItem] = useState(undefined);
  const [values, setValues] = useState([]);
  const [valuesItem, setValuesItem] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const itemsWithIcons = [
    {
      id: 1,
      component: Item,
      componentProps: {
        text: 'Тема 1',
        iconSrc: require('./images/demoItemIcon.png'),
        size: 'small',
      },
    },
    {
      id: 2,
      component: Item,
      componentProps: {
        text: 'Тема 2 (тест для отображения строки, длина которой превышает разумные размеры)',
        iconSrc: require('./images/demoItemIcon.png'),
        size: 'small',
        tooltipText: 'Тема 2 (тест для отображения строки,'
          + 'длина которой превышает разумные размеры)',
      },
    },
    {
      id: 3,
      component: Item,
      componentProps: {
        text: 'Тема 3',
        iconSrc: require('./images/demoItemIcon.png'),
        size: 'small',
      },
    },
  ];

  const onChange = (e, multiple) => {
    const currentValue = e?.target?.value !== undefined ? e.target.value : e;
    if (multiple) {
      if (R.contains(currentValue, values)) {
        setValues(R.reject(v => v === currentValue, values));
      } else {
        setValues(R.append(currentValue, values));
      }
    } else {
      setValue(currentValue);
    }
  };

  const onChangeItem = (e, multiple) => {
    const currentValue = e?.target?.value !== undefined ? e.target.value : e;
    if (multiple) {
      if (R.contains(currentValue, valuesItem)) {
        setValuesItem(R.reject(v => v === currentValue, valuesItem));
      } else {
        setValuesItem(R.append(currentValue, valuesItem));
      }
    } else {
      setValueItem(currentValue);
    }
  };

  return (
    <div className={css(styles.container)}>
      <div>
        Disabled:
        <input
          type="checkbox"
          checked={disabled}
          onClick={() => setDisabled(!disabled)}
        />
      </div>
      <Select
        input={{ value, onChange: e => onChange(e, false) }}
        placeholder="Select value"
        tooltipText="Select value"
        disabled={disabled}
        items={['item1', 'item2', 'item3', 'item4']}
      />
      <div>
        Примеры Select на базе компонента Item
      </div>
      <Select
        input={{ value: valueItem, onChange: e => onChangeItem(e, false) }}
        placeholder="Select value"
        tooltipText="Select value"
        disabled={disabled}
        items={itemsWithIcons}
      />
      <div>
        Примеры Select с multiple=true
      </div>
      <Select
        input={{ value: values, onChange: e => onChange(e, true) }}
        placeholder="Select value"
        tooltipText="Select value"
        disabled={disabled}
        multiple
        items={['long item name1', 'long item name2', 'long item name3', 'long item name4']}
      />
      <div>
        Примеры Select с multiple=true на базе компонента Item
      </div>
      <Select
        input={{ value: valuesItem, onChange: e => onChangeItem(e, true) }}
        placeholder="Select value"
        tooltipText="Select value"
        disabled={disabled}
        multiple
        items={itemsWithIcons}
      />
    </div>
  );
};

export default SelectExample;
