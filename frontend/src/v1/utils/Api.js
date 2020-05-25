import Axios from 'axios';
import * as R from 'ramda';
import Qs from 'qs';
import { ApiUrl } from '@/v1/Environ';


Axios.interceptors.request.use((config) => {
  const configCopy = R.clone(config);
  configCopy.paramsSerializer = params => Qs.stringify(params, { arrayFormat: 'brackets' });
  return configCopy;
});

const Api = {
  get(url, options) {
    window.loadingIndicator && window.loadingIndicator.startLoading();

    return Axios.get(
      `${ApiUrl}${url}`,
      {
        params: R.propOr({}, 'params', options),
        withCredentials: true,
      },
    ).then((response) => {
      window.loadingIndicator && window.loadingIndicator.stopLoading();

      if (!options.success) {
        return;
      }

      if (response.data.payload) {
        options.success(response.data.payload, response.data.metadata);
      } else {
        options.success(response.data);
      }
    }).catch((error) => {
      window.loadingIndicator && window.loadingIndicator.stopLoading();

      if (!options.failed) {
        return;
      }

      options.failed(error);
    });
  },
  post(url, data, options) {
    const method = R.propOr('post', 'method')(options);

    if (![
      'post',
      'patch',
      'update',
      'delete',
    ].includes(method)) {
      throw `ArgumentError: method argument has invalid value ${method}.`;
    }

    let config = R.propOr({}, 'config')(options);

    if (options.type === 'form-multipart') {
      const headers = R.propOr({}, 'headers')(config);

      config = {
        ...config,
        headers: {
          'Content-Type': 'multipart/form-data',
          ...headers,
        },
      };
    }

    window.loadingIndicator && window.loadingIndicator.startLoading();

    Axios({
      ...options,
      ...(data ? { data } : {}),
      url: `${ApiUrl}${url}`,
      method,
      config,
      withCredentials: true,
    }).then((response) => {
      window.loadingIndicator && window.loadingIndicator.stopLoading();

      if (!options.success) {
        return;
      }

      options.success(response.data.payload);
    }).catch((error) => {
      window.loadingIndicator && window.loadingIndicator.stopLoading();

      if (!options.failed) {
        return;
      }

      options.failed(error);
    });
  },
  patch(url, data, options) {
    return this.post(url, data, { ...options, method: 'patch' });
  },
};

export default Api;
