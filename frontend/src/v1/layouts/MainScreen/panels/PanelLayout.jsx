import React from 'react';
import PropTypes from 'prop-types';
import { css, StyleSheet } from '../../../aphrodite';
import AvatarRound from '@/v1/components/AvatarRound/AvatarRound';
import { themeStyles, separatorColor } from '@/v1/theme';
import SettingsContext from "../../../contexts/SettingsContext";

const styles = StyleSheet.create({
  panel: {
    paddingLeft: 101,
    paddingRight: 40,
    paddingTop: 47,
    borderRight: `1px solid ${separatorColor}`,
    minHeight: 'calc(100vh - 47px)',
    display: 'flex',
    flexDirection: 'column',
  },
  authorBlock: {
    display: 'flex',
    flexDirection: 'row',
  },
  authorInfo: {
    paddingLeft: 24,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  description: { marginTop: 11 },
  descriptionDetail: {
    marginTop: 16,
    marginBottom: 21,
  },
});

const PanelLayout = ({ children }) => (
  <SettingsContext.Consumer>
    {
      ({ settings }) => (
        <div className={css(styles.panel)}>
          <div className={css(styles.authorBlock)}>
            <AvatarRound src={settings?.avatar?.url} />
            <div className={css(styles.authorInfo)}>
              <div className={css(themeStyles.headerFont)}>
                {settings?.nickname}
              </div>
              <div className={css(styles.description, themeStyles.detailsFont)}>
                {settings?.specialization}
              </div>
            </div>
          </div>
          <div className={css(styles.descriptionDetail, themeStyles.detailsFont)}>
            {settings?.about}
          </div>
          {children}
        </div>
      )
    }
  </SettingsContext.Consumer>
);

PanelLayout.propTypes = { children: PropTypes.node };

export default PanelLayout;
