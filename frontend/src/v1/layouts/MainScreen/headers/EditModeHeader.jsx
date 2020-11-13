import React from 'react';
import PropTypes from 'prop-types';

import { css, StyleSheet } from '../../../aphrodite';

import HeaderLayout from './HeaderLayout';
import Search from '../../../components/Search/Search';
import Button from '../../../components/Button/Button';

const styles = StyleSheet.create({
  searchWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const EditModeHeader = ({ addNewPost }) => (
  <HeaderLayout>
    <div className={css(styles.searchWrapper)}>
      <Search variants={[]} onChange={() => {}} />
    </div>
    <Button onClick={addNewPost} btnStyle="success">Добавить новый пост</Button>
  </HeaderLayout>
);

EditModeHeader.propTypes = { addNewPost: PropTypes.func };

export default EditModeHeader;
