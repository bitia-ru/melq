import React, { useState } from 'react';
import Theme from '@/v1/components/Theme/Theme';

const demoTheme = { id: 1, text: 'Тема1' };

const ThemeExample = () => {
  const [size, setSize] = useState(null);

  const onTriggered = () => {
    console.log('triggered');
  };

  return (
    <>
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
      </div>
      <Theme onTriggered={onTriggered} size={size} theme={demoTheme} />
    </>
  );
};

export default ThemeExample;
