import React, { useState } from 'react';
import { StyleSheet, css } from '@/v1/aphrodite';
import Search from '@/v1/components/Search/Search';

const styles = StyleSheet.create({
  container: {
    width: 335,
    display: 'inline-block',
  },
});

const SearchExample = () => {
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState(null);

  const onChange = (e) => {
    const currentValue = e?.target?.value !== undefined ? e.target.value : e;
    setValue(currentValue);
  };

  const submit = () => {
    console.log('submit search', value);
  };

  return (
    <div className={css(styles.container)}>
      <input
        type="checkbox"
        checked={disabled}
        onClick={() => setDisabled(!disabled)}
      />
      Disabled
      <Search
        text={value}
        variants={['Пост 1', 'Пост 2', 'Пост 3', 'Пост 4']}
        disabled={disabled}
        onChange={onChange}
        submit={submit}
      />
    </div>
  );
};

export default SearchExample;
