import React, { useState } from 'react';
import * as R from 'ramda';
import { StyleSheet, css } from '@/v1/aphrodite';
import Comment from '@/v1/components/Comment/Comment';
import CommentContext from '@/v1/contexts/CommentContext';

const styles = StyleSheet.create({ container: { width: 840 } });

const content = 'Прощайте переезды, рабочие визы....теперь кто из айтишников'
  + ' хочет уехать с России придется искать компании спонсоры не в FAANG и то не'
  + ' факт что остальные не перейдут на удаленку';

const anonymousGuestComment = {
  id: 1,
  content,
  created_at: new Date(),
  num_of_likes: 57,
  hidden: false,
};

const guestComment = {
  ...anonymousGuestComment,
  author_name: 'Имя Фамилия',
  author_url: require('./images/demo_image_icon.jpg'),
};

const blogAuthorComment = {
  ...anonymousGuestComment,
  user_id: 1,
  author_name: 'Артем Левенков',
  author_url: require('./images/demo_avatar.png'),
};

const demoUser = { id: 1 };

const CommentExample = () => {
  const [user, setUser] = useState(null);
  const [comment, setComment] = useState(anonymousGuestComment);

  const answer = () => console.log('answer');
  const edit = () => console.log('edit');
  const update = () => console.log('updateComment');
  const remove = () => console.log('removeComment');

  return (
    <div className={css(styles.container)}>
      <div>
        <input
          type="checkbox"
          checked={user === null}
          onClick={() => setUser(user === null ? demoUser : null)}
        />
        Гость
      </div>
      <div>
        <div>
          <input
            type="radio"
            id="anonymous"
            name="size"
            value="anonymous"
            checked={R.equals(comment, anonymousGuestComment)}
            onClick={() => setComment(anonymousGuestComment)}
          />
          <span>Анонимный комментарий</span>
          <input
            type="radio"
            id="guest"
            name="size"
            value="guest"
            checked={R.equals(comment, guestComment)}
            onClick={() => setComment(guestComment)}
          />
          <span>Комментарий гостя</span>
          <input
            type="radio"
            id="author"
            name="size"
            value="author"
            checked={R.equals(comment, blogAuthorComment)}
            onClick={() => setComment(blogAuthorComment)}
          />
          <span>Комментарий автора блога</span>
        </div>
      </div>
      <CommentContext.Provider
        value={{
          answer,
          edit,
          update,
          remove,
        }}
      >
        <Comment
          comment={comment}
          user={user}
        />
      </CommentContext.Provider>
    </div>
  );
};

export default CommentExample;
