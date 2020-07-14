import React from 'react';
import * as R from 'ramda';
import { Link } from 'react-router-dom';
import examples from './index';

const Main = () => {
  const prepareName = name => (
    R.join(
      ' ',
      R.map(
        w => R.toUpper(w[0]) + R.slice(1, Infinity, w),
        R.split('_', name),
      ),
    )
  );

  return (
    <>
      {
        R.map(
          example => (
            <div key={example}>
              <Link to={`/components/${example}`}>{prepareName(example)}</Link>
            </div>
          ),
          R.sort((a, b) => (a - b), R.keys(examples)),
        )
      }
    </>
  );
};

export default Main;
