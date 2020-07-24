import React, { useState } from 'react';
import CommentCounter from '../components/icon_counters/CommentCounter/CommentCounter';
import ShareCounter from '../components/icon_counters/ShareCounter/ShareCounter';
import ViewCounter from '../components/icon_counters/ViewCounter/ViewCounter';
import LikeCounter from '../components/icon_counters/LikeCounter/LikeCounter';
import { StyleSheet, css } from '../aphrodite';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '390px',
    height: '40px',
    margin: 'auto 50px',
  },
  smallCounterWrapper: {
    display: 'flex',
    width: '50px',
    height: '40px',
    margin: 'auto 50px',
  },
  btnWrapper: { margin: '5px 20px' },
});

const CounterExample = () => {
  const [disabled, setDisabled] = useState(false);
  const [likeCounterChecked, setLikeCounterChecked] = useState(false);
  const [smallLikeCounterChecked, setSmallLikeCounterChecked] = useState(false);
  const [numOfLikes, setNumOfLikes] = useState(0);
  const [numOfLikesSmallCounter, setNumOfLikesSmallCounter] = useState(0);
  const [numOfComments, setNumOfComments] = useState(5);
  const [numOfShares, setNumOfShares] = useState(7);
  const [numOfViews, setNumOfViews] = useState(9);
  const [hoverable, setHoverable] = useState(true);

  const onLikeCounterClick = () => {
    if (numOfLikes === 0) {
      setNumOfLikes(1);
      setLikeCounterChecked(true);
      return;
    }
    setNumOfLikes(0);
    setLikeCounterChecked(false);
  };

  const onSmallLikeCounterClick = () => {
    if (numOfLikesSmallCounter === 0) {
      setNumOfLikesSmallCounter(1);
      setSmallLikeCounterChecked(true);
      return;
    }
    setNumOfLikesSmallCounter(0);
    setSmallLikeCounterChecked(false);
  };

  const onCommentCounterClick = () => {
    setNumOfComments(numOfComments + 1);
    alert('Redirect to comments textarea for type a comment');
  };

  const onShareCounterClick = () => {
    setNumOfShares(numOfShares + 1);
    alert('Share post');
  };

  const resetCounters = () => {
    setNumOfLikes(0);
    setNumOfLikesSmallCounter(0);
    setLikeCounterChecked(false);
    setNumOfComments(0);
    setNumOfShares(0);
    setNumOfViews(0);
  };

  return (
    <div>
      <div>Default Counters</div>
      <div className={css(styles.container)}>
        <LikeCounter
          onClick={onLikeCounterClick}
          checked={likeCounterChecked}
          disabled={disabled}
          value={numOfLikes}
          hoverable={hoverable}
        />
        <CommentCounter
          onClick={onCommentCounterClick}
          disabled={disabled}
          value={numOfComments}
          hoverable={hoverable}
        />
        <ShareCounter
          onClick={onShareCounterClick}
          disabled={disabled}
          value={numOfShares}
          hoverable={hoverable}
        />
        <ViewCounter
          disabled={disabled}
          value={numOfViews}
          hoverable={false}
        />
      </div>
      <div>Small LikeCounter</div>
      <div className={css(styles.smallCounterWrapper)}>
        <LikeCounter
          onClick={onSmallLikeCounterClick}
          checked={smallLikeCounterChecked}
          disabled={disabled}
          value={numOfLikesSmallCounter}
          hoverable={hoverable}
          size="small"
        />
      </div>
      <div className={css(styles.btnWrapper)}>
        <button
          onClick={() => setDisabled(!disabled)}
          type="button"
        >
          Click
        </button>
        <span> Disable Counters</span>
      </div>
      <div className={css(styles.btnWrapper)}>
        <button
          onClick={resetCounters}
          type="button"
        >
          Click
        </button>
        <span> Reset Counters</span>
      </div>
      <div className={css(styles.btnWrapper)}>
        <button
          onClick={() => setHoverable(!hoverable)}
          type="button"
        >
          Click
        </button>
        <span> Set Counters is OR is not scalable on hover</span>
      </div>
    </div>
  );
};

export default CounterExample;
