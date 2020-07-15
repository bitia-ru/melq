import React, { useState } from 'react';
import LanguageSelect from '@/v1/components/LanguageSelect/LanguageSelect';

const LanguageSelectExample = () => {
  const [disabled, setDisabled] = useState(false);
  const [languageId, setLanguageId] = useState('ru');

  return (
    <>
      Disabled
      <input type="checkbox" checked={disabled} onClick={() => setDisabled(!disabled)} />
      <LanguageSelect onChange={setLanguageId} languageId={languageId} disabled={disabled} />
    </>
  );
};

export default LanguageSelectExample;
