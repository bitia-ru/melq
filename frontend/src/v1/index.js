// eslint-disable-next-line import/newline-after-import,import/order
import { SentryDsn } from './Environ';
Sentry.init({ dsn: SentryDsn }); // eslint-disable-line no-undef

/* eslint-disable import/first */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ActionCable from 'actioncable';
import V1 from '@/v1/V1';
import store from './store';
import './index.css';
import './fonts.css';
import processEntities from '@/v1/utils/processEntities';
/* eslint-enable import/first */

const EVENTS_TO_MODIFY = ['touchstart', 'touchmove', 'touchend', 'touchcancel', 'wheel', 'dragend', 'click'];

const originalAddEventListener = document.addEventListener.bind();
document.addEventListener = (type, listener, options, wantsUntrusted) => {
  let modOptions = options;
  if (EVENTS_TO_MODIFY.includes(type)) {
    if (typeof options === 'boolean') {
      modOptions = {
        capture: options,
        passive: false,
      };
    } else if (typeof options === 'object') {
      modOptions = {
        passive: false,
        ...options,
      };
    }
  }

  return originalAddEventListener(type, listener, modOptions, wantsUntrusted);
};

const originalRemoveEventListener = document.removeEventListener.bind();
document.removeEventListener = (type, listener, options) => {
  let modOptions = options;
  if (EVENTS_TO_MODIFY.includes(type)) {
    if (typeof options === 'boolean') {
      modOptions = {
        capture: options,
        passive: false,
      };
    } else if (typeof options === 'object') {
      modOptions = {
        passive: false,
        ...options,
      };
    }
  }
  return originalRemoveEventListener(type, listener, modOptions);
};

document.addEventListener('DOMContentLoaded', () => {
  const ws = {};

  ws.cable = ActionCable.createConsumer('/cable');

  ws.cable.subscriptions.create(
    { channel: 'EntitiesChannel' },
    {
      received(data) {
        processEntities(store.dispatch, data);
      },
    },
  );
});

ReactDOM.render(
  (
    <Provider store={store}>
      <BrowserRouter>
        <V1 />
      </BrowserRouter>
    </Provider>
  ),
  document.getElementById('app'),
);
