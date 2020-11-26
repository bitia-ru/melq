import React from 'react';
import { withRouter } from 'react-router-dom';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { css, StyleSheet } from '../aphrodite';

import { currentUser } from '@/v1/redux/user_session/utils';
import { loadTags, createTag, removeTags } from '@/v1/redux/tags/actions';

import withModals from '../modules/modalable';

import MainScreen from '../layouts/MainScreen/MainScreen';
import Link from '../components/Link/Link';
import CheckBox from '../components/CheckBox/CheckBox';
import TagNewForm from '../forms/TagNewForm';
import Tag from '../components/Tag/Tag';

import { bgColor } from '../theme';

const styles = StyleSheet.create({
  controlRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '40px',
  },
  linkText: {
    marginLeft: '7px',
    marginTop: '1px',
  },
  linkContainer: { display: 'inline-block' },
  innerContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  mainContent: {
    marginTop: '31px',
    paddingTop: '40px',
    paddingLeft: '50px',
    paddingRight: '74px',
    paddingBottom: '45px',
    backgroundColor: bgColor,
    display: 'grid',
    gridTemplateColumns: '25% 25% 25% 25%',
    gridAutoFlow: 'column',
  },
  itemWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  checkboxWrapper: { marginRight: '16px' },
});

class TagsIndex extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedTagsIds: [],
      removeBtnIsWaiting: false,
    };
  }

  componentDidMount() {
    this.props.loadTags();
  }

  addTag = () => {
    this.props.history.push('#new');
  };

  save = (tagText, afterSuccess, afterAll) => {
    this.props.createTag(
      { tag: { text: tagText } },
      afterSuccess,
      afterAll,
    );
  };

  removeSelectedTags = () => {
    if (window.confirm('Удалить темы?')) {
      this.setState({ removeBtnIsWaiting: true });
      this.props.removeTags(
        this.state.selectedTagsIds,
        () => this.setState({ selectedTagsIds: [] }),
        () => this.setState({ removeBtnIsWaiting: false }),
      );
    }
  };

  onCheckboxClick = (id) => {
    const { selectedTagsIds } = this.state;
    this.setState({
      selectedTagsIds: (
        R.contains(id, selectedTagsIds)
          ? R.reject(e => e === id, selectedTagsIds)
          : R.append(id, selectedTagsIds)
      ),
    });
  };

  modals() {
    return {
      new: {
        hashRoute: true,
        body: <TagNewForm save={this.save} />,
      },
    };
  }

  render() {
    const { selectedTagsIds } = this.state;
    const { user, tags } = this.props;

    const numOfColumns = 4;
    const gridTemplateRows = R.join(
      ' ',
      R.times(
        () => '60px',
        Math.ceil(tags.length / numOfColumns),
      ),
    );
    return (
      <MainScreen header="" user={user}>
        <div className={css(styles.controlRow)}>
          <div className={css(styles.linkContainer)}>
            <Link onTriggered={this.addTag}>
              <div className={css(styles.innerContainer)}>
                <svg width={24} height={24}>
                  <use xlinkHref={`${require('../components/Link/images/add.svg')}#add`} />
                </svg>
                <span className={css(styles.linkText)}>Добавить тему</span>
              </div>
            </Link>
          </div>
          <div className={css(styles.linkContainer)}>
            <Link
              onTriggered={this.removeSelectedTags}
              isWaiting={this.state.removeBtnIsWaiting}
            >
              <div className={css(styles.innerContainer)}>
                <svg width={16} height={16}>
                  <use xlinkHref={`${require('../components/Link/images/trash.svg')}#trash`} />
                </svg>
                <span className={css(styles.linkText)}>Удалить</span>
              </div>
            </Link>
          </div>
        </div>
        <div
          className={css(styles.mainContent)}
          style={{ gridTemplateRows }}
        >
          {
            R.map(
              tag => (
                <div className={css(styles.itemWrapper)} key={tag.id}>
                  <div className={css(styles.checkboxWrapper)}>
                    <CheckBox
                      onClick={() => this.onCheckboxClick(tag.id)}
                      checked={R.contains(tag.id, selectedTagsIds)}
                    />
                  </div>
                  <Tag tag={tag} />
                </div>
              ),
              tags,
            )
          }
        </div>
      </MainScreen>
    );
  }
}

TagsIndex.propTypes = {
  user: PropTypes.object,
  tags: PropTypes.array,
  history: PropTypes.object,
  loadTags: PropTypes.func,
  createTag: PropTypes.func,
  removeTags: PropTypes.func,
};

const mapStateToProps = state => ({
  user: currentUser(state),
  tags: R.values(state.tagsStoreV1.tags),
});

const mapDispatchToProps = dispatch => ({
  loadTags: () => dispatch(loadTags()),
  createTag: (attributes, afterSuccess, afterAll) => (
    dispatch(createTag(attributes, afterSuccess, afterAll))
  ),
  removeTags: (ids, afterSuccess, afterAll) => dispatch(removeTags(ids, afterSuccess, afterAll)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withModals(TagsIndex)));
