import { StyleSheet } from '../../aphrodite';
import { dateTopicCounterColor, mainFontColor, separatorColor, successColor } from '../../theme';

const styles = StyleSheet.create({
  headerRow: {
    color: mainFontColor,
    marginTop: '35px',
    marginBottom: '26px',
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '33.33% 66.66%',
  },
  leftColumn: { marginRight: '18px' },
  rightColumn: { marginLeft: '9px' },
  header: { color: mainFontColor },
  keyCardHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px',
  },
  topCardBlock: {
    marginBottom: '27px',
    display: 'grid',
    gridTemplateColumns: '50% 50%',
  },
  leftCard: { marginRight: '13.5px' },
  rightCard: { marginLeft: '13.5px' },
  bottomCardBlock: {
    display: 'grid',
    gridTemplateColumns: '50% 50%',
  },
  socialLinkRow: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '24px',
  },
  socialLinkRowTop: { paddingTop: '3px' },
  socialLinkRowBordered: {
    paddingBottom: '24px',
    borderBottom: `1px solid ${separatorColor}`,
  },
  aboutBlogInputWrapper: { marginBottom: '17px' },
  loadAvatarContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: '21px',
  },
  loadBtnWrapper: {
    width: '133px',
    marginLeft: '16px',
  },
  aboutAuthorTextAreaWrapper: { marginTop: '21px' },
  socialLinkIconWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  socialLinkIntegrationState: {
    marginLeft: '15px',
    color: dateTopicCounterColor,
  },
  socialLinkIntegrationStateActive: { color: successColor },
});

export default styles;
