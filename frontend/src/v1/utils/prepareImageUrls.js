import * as R from 'ramda';

const prepareImageUrls = (lookUp, content) => {
  let preparedContent = content;
  R.forEachObjIndexed(
    (url, filename) => {
      const re = new RegExp(`!\\[([^\\[\\]]*)]\\(${filename}\\)`);
      while (R.test(re, preparedContent)) {
        preparedContent = R.replace(re, `![$1](${url})`, preparedContent);
      }
    },
    lookUp,
  );
  return preparedContent;
};

export default prepareImageUrls;
