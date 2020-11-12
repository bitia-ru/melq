import React from 'react';
import PropTypes from 'prop-types';
import { css, StyleSheet } from '../../../aphrodite';

import HeaderLayout from './HeaderLayout';
import Search from '../../../components/Search/Search';
import Button from '../../../components/Button/Button';

const styles = StyleSheet.create({ addPostBtn: { width: 203 } });

const EditModeHeader = ({ addNewPost }) => (
  <HeaderLayout>
    <div>
      <Search variants={[]} onChange={() => {}} />
    </div>
    <div className={css(styles.addPostBtn)}>
      <Button onClick={addNewPost} btnStyle="success">Добавить новый пост</Button>
    </div>
  </HeaderLayout>
);

EditModeHeader.propTypes = { addNewPost: PropTypes.func };

export default EditModeHeader;
