import postProcessor from './post_processor';
import tagProcessor from './tag_processor';
import userProcessor from './user_processor';
import userSessionProcessor from './user_session_processor';
import commentProcessor from './comment_processor';
import settingProcessor from './setting_processor';
import postCardProcessor from './post_card_processor';

const entityProcessors = {
  post: postProcessor,
  tag: tagProcessor,
  user: userProcessor,
  user_session: userSessionProcessor,
  comment: commentProcessor,
  setting: settingProcessor,
  post_card: postCardProcessor,
};

export default entityProcessors;
