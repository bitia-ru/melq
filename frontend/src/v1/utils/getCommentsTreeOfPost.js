import * as R from 'ramda';
import buildTreeFromArray from '@/v1/utils/buildTreeFromArray';

const getCommentsTreeOfPost = (postSlug, comments) => {
  const postComments = R.values(
    R.filter(
      comment => (comment.post_slug === postSlug),
      comments,
    ),
  );
  return buildTreeFromArray(
    'comments',
    postComments,
    arr => R.filter(comment => (comment.comment_id === null), arr),
    (obj, arr) => R.filter(c => (c.comment_id === obj.id), arr),
  );
};

export default getCommentsTreeOfPost;
