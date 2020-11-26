import React, { useState } from 'react';
import Tag from '@/v1/components/Tag/Tag';

const demoTag = { id: 1, text: 'Тема1' };

const TagExample = () => {
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
      <Tag onTriggered={onTriggered} size={size} tag={demoTag} />
    </>
  );
};

export default TagExample;
