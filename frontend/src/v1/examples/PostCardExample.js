import React, { useState } from 'react';
import PostCard from '../components/PostCard/PostCard';
import { StyleSheet, css } from '../aphrodite';
import { defaultColor, mainBgColor } from '../theme';

const styles = StyleSheet.create({
  container: {
    border: `1px solid ${defaultColor}`,
    margin: '20px',
    color: defaultColor,
    background: mainBgColor,
  },
  title: {
    fontSize: '20px',
    margin: '50px',
  },
  cardWrapper: {
    margin: '77px 33px 0px 16px',
    display: 'flex',
    flexWrap: 'wrap',
  },
});

const posts = [
  {
    id: 1,
    title: 'About blog',
    content: 'About blog',
    num_of_likes: null,
    num_of_reposts: null,
    num_of_views: null,
    created_at: '2020-07-12T08:56:28.739Z',
    images: [],
    card_image: null,
    topic: 'Название темы',
    num_of_comments: null,
    likes: [],
  },
  {
    id: 2,
    title: 'Privacy policy',
    content: 'Privacy policy',
    num_of_likes: null,
    num_of_reposts: null,
    num_of_views: null,
    created_at: '2020-07-12T08:56:28.744Z',
    images: [],
    card_image: null,
    topic: 'Название темы',
    num_of_comments: null,
    likes: [],
  },
  {
    id: 3,
    title: 'POODR. Managing Dependencies',
    content: 'Practical Object-Oriented Design in Ruby',
    num_of_likes: 2,
    num_of_reposts: 4,
    num_of_views: 5,
    created_at: '2020-01-12T08:56:28.744Z',
    images: [],
    card_image: {
      id: '1',
      url: `${require('./images/postCard_demo_image.png')}`,
    },
    topic: 'Ruby',
    num_of_comments: null,
    card_color_id: 0,
  },
  {
    id: 4,
    title: 'Тестовый блок с 56 знаками в заголовке. Тестовый блок!!!',
    content: 'Тестовый блок с 58 знаками в описании карточки. Тестовый!!',
    num_of_likes: 4,
    num_of_reposts: 4,
    num_of_views: 4,
    created_at: '2020-01-12T08:56:28.744Z',
    images: [],
    card_image: {
      id: '1',
      url: `${require('./images/postCard_demo_image.png')}`,
    },
    topic: 'Тест',
    num_of_comments: null,
    card_color_id: 2,
  },
  {
    id: 5,
    title: 'Тестовый блок без описания и без изображения',
    content: '',
    num_of_likes: 3,
    num_of_reposts: 2,
    num_of_views: 6,
    created_at: '2020-01-12T08:56:28.744Z',
    images: [],
    card_image: null,
    topic: 'Тест',
    num_of_comments: null,
    card_color_id: 1,
  },
];

const CardExample = () => {
  const [disabled, setDisabled] = useState({
    like: false,
    comment: false,
    share: false,
    view: false,
  });

  const onClick = (e, target) => {
    e.stopPropagation();
    switch (target) {
    case 'like':
      console.log('Click on like counter');
      break;
    case 'comment':
      console.log('Redirect to comment');
      break;
    case 'share':
      console.log('Share post');
      break;
    default:
      console.log('Redirect to post');
    }
  };

  const disableCounter = () => {
    setDisabled({
      like: !disabled.like,
      comment: !disabled.comment,
      share: !disabled.share,
      view: !disabled.view,
    });
  };

  return (
    <div className={css(styles.container)}>
      <div className={css(styles.title)}>Post Cards</div>
      <div className={css(styles.btnWrapper)}>
        <input
          type="button"
          value="Click"
          name="disabled"
          id="disabled"
          onClick={disableCounter}
        />
        <span>Перевести Counters в disabled</span>
      </div>
      <div className={css(styles.cardWrapper)}>
        {
          posts.map(
            post => (
              <PostCard
                post={post}
                onClick={onClick}
                disabledCounter={disabled}
                key={post.id}
              />
            ),
          )
        }
      </div>
    </div>
  );
};

export default CardExample;
